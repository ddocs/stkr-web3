/* eslint-disable @typescript-eslint/interface-name-prefix */
import { JsonRpcResponse } from 'web3-core-helpers/types';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { BigNumber } from 'bignumber.js';

export interface ProviderConfig {
  networkId: string;
  chainId: string;
}

export interface SendOptions {
  data?: string;
  gasLimit?: string;
  value?: string;
}

export abstract class KeyProvider {
  protected _currentAccount: string | null = null;
  protected _web3: Web3 | null = null;

  constructor(protected providerConfig: ProviderConfig) {}

  protected getWeb3(): Web3 {
    if (!this._web3) throw new Error('Web3 must be initialized');
    return this._web3;
  }

  public createContract(abi: AbiItem[] | AbiItem, address: string): Contract {
    if (!this._web3) throw new Error('Web3 must be initialized');
    return new this._web3.eth.Contract(abi, address);
  }

  public abstract connect(): Promise<void>;

  public abstract close(): Promise<void>;

  public currentAccount(): string {
    if (!this._currentAccount) throw new Error('MetaMask is not activated');
    return this._currentAccount;
  }

  public currentChain(): string {
    return this.providerConfig.chainId;
  }

  public currentNetwork(): string {
    return this.providerConfig.networkId;
  }

  public abstract findAccounts(): Promise<string[]>;

  public async isGranted(address: string | undefined = undefined) {
    const accounts = await this.findAccounts();
    if (!Array.isArray(accounts)) {
      throw new Error('Accounts should have array type');
    } else if (address === undefined) {
      return accounts.length > 0;
    }
    return accounts.indexOf(address) >= 0;
  }

  public abstract sign(
    data: Buffer | string | object,
    address: string,
  ): Promise<string>;

  public abstract invoke(
    from: string,
    to: string,
    sendOptions: SendOptions,
  ): Promise<JsonRpcResponse>;

  public abstract send(
    from: string,
    to: string,
    sendOptions: SendOptions,
  ): Promise<JsonRpcResponse>;

  public async signLoginData(ttl: number): Promise<string> {
    const currentTime = Math.floor(new Date().getTime()),
      expiresAfter = currentTime + ttl;
    const data = `Stkr Login Message:\n${expiresAfter}`,
      signature = await this.sign(data, this.currentAccount());
    const formData = `signature=${signature}&address=${this.currentAccount()}&expires=${expiresAfter}`;
    return new Buffer(formData, 'utf-8').toString('base64');
  }

  public async ethereumBalance(address: string): Promise<string> {
    const balance = await this.getWeb3().eth.getBalance(address);
    return new BigNumber(`${balance}`)
      .dividedBy(new BigNumber(10).pow(18))
      .toString();
  }

  public async erc20Balance(
    contract: Contract,
    address: string,
  ): Promise<string> {
    const balance = await contract.methods.balanceOf(address).call();
    let decimals = await contract.methods.decimals().call();
    if (!Number(decimals)) decimals = 18;
    return new BigNumber(`${balance}`)
      .dividedBy(new BigNumber(10).pow(decimals))
      .toString();
  }

  public async latestBlockHeight(): Promise<number> {
    return this.getWeb3().eth.getBlockNumber();
  }
}
