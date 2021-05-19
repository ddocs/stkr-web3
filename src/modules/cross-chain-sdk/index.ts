import BigNumber from 'bignumber.js';
import { Transaction } from 'ethereumjs-tx';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { StkrSdk } from '../api';
import { ISendAsyncResult, SendOptions } from '../api/provider';
import ABI_CROSS_CHAIN_BRIDGE from './abi/CrossChainBridge.json';
import DEFAULT_CONFIG from './addresses.json';
import { AVAILABLE_NETWORKS, INetworkEntity } from './network';

export interface IBridgeEntity {
  bridgeStatus: 'Disabled' | 'Enabled';
  bridgeType: 'Mintable' | 'Lockable';
  fromChain: string;
  toChain: string;
  fromToken: string;
  toToken: string;
}

const mapBridgeToEntityUnsafe = (value: any): IBridgeEntity => {
  let bridgeStatus: string,
    bridgeType: string,
    fromToken,
    toToken,
    fromChain,
    toChain;
  if (typeof value === 'object') {
    bridgeStatus = value['0'];
    bridgeType = value['1'];
    fromToken = value['2'];
    toToken = value['3'];
    fromChain = value['4'];
    toChain = value['5'];
  } else if (Array.isArray(value)) {
    bridgeStatus = value[0];
    bridgeType = value[1];
    fromToken = value[2];
    toToken = value[3];
    fromChain = value[4];
    toChain = value[5];
  } else {
    throw new Error(`Unknown bridge type: ${value}`);
  }
  const mapStatus = () => {
    if (bridgeStatus === '0') {
      return 'Disabled';
    } else if (bridgeStatus === '1') {
      return 'Enabled';
    }
    throw new Error(`Unknown bridge status: ${bridgeStatus}`);
  };
  const mapType = () => {
    if (bridgeType === '0') {
      return 'Mintable';
    } else if (bridgeType === '1') {
      return 'Lockable';
    }
    throw new Error(`Unknown bridge type: ${bridgeType}`);
  };
  return {
    bridgeStatus: mapStatus(),
    bridgeType: mapType(),
    fromChain: fromChain,
    toChain: toChain,
    fromToken: fromToken,
    toToken: toToken,
  };
};

export class CrossChainSdk {
  private readonly crossChainContract: Record<string, Contract>;
  private readonly currentNetwork: INetworkEntity;
  private readonly supportedChains: Set<string> = new Set<string>();
  private readonly currentContractAddress: string;
  private readonly currentContract: Contract;

  private constructor(
    private readonly web3: Web3,
    configMap: Record<
      string,
      {
        CrossChainBridge: string;
        Migrations: string;
      }
    >,
    chainId: number | string,
  ) {
    const contractMap: Record<string, Contract> = {};
    let currentContract: Contract | undefined = undefined,
      currentContractAddress: string | undefined = undefined;
    for (const [key, value] of Object.entries(configMap)) {
      const contract = new web3.eth.Contract(
        ABI_CROSS_CHAIN_BRIDGE as any,
        value.CrossChainBridge,
      );
      if (String(chainId) === key) {
        currentContract = contract;
        currentContractAddress = value.CrossChainBridge;
      }
      contractMap[key] = contract;
    }
    if (!currentContract || !currentContractAddress) {
      throw new Error(`CrossChain is not supported by current chain`);
    }
    this.currentContractAddress = currentContractAddress;
    this.currentContract = currentContract;
    Object.keys(configMap).forEach(v => this.supportedChains.add(v));
    this.crossChainContract = contractMap;
    this.currentNetwork = CrossChainSdk.findNetworkForChain(chainId);
  }

  public static findNetworkForChain(chainId: number | string): INetworkEntity {
    const [network] = Object.values(AVAILABLE_NETWORKS).filter(
      n => n.chainId === `${chainId}`,
    );
    if (!network) {
      throw new Error(`Unable to resolve current network for chain ${chainId}`);
    }
    return network;
  }

  public static async fromConfigFile(web3: Web3): Promise<CrossChainSdk> {
    return CrossChainSdk.fromConfigMap(web3, DEFAULT_CONFIG as any);
  }

  public static async fromConfigMap(
    web3: Web3,
    configMap: Record<
      string,
      {
        CrossChainBridge: string;
        Migrations: string;
      }
    >,
  ): Promise<CrossChainSdk> {
    const chainId = await web3.eth.getChainId();
    return new CrossChainSdk(web3, configMap, chainId);
  }

  public getCurrentNetwork(): INetworkEntity {
    return this.currentNetwork;
  }

  public getAvailableNetworks(): INetworkEntity[] {
    return Object.values(AVAILABLE_NETWORKS)
      .filter(network => this.supportedChains.has(network.chainId))
      .filter(network => network.type === this.currentNetwork.type);
  }

  public getTargetNetworks(): INetworkEntity[] {
    return this.getAvailableNetworks().filter(
      network => network.chainId !== this.currentNetwork.chainId,
    );
  }

  public async getAllBridges(): Promise<IBridgeEntity[]> {
    const bridges = await this.currentContract.methods.getAllBridges().call();
    /* first element is zero element */
    return bridges
      .slice(1)
      .map((v: any) => {
        try {
          return mapBridgeToEntityUnsafe(v);
        } catch (e) {
          console.error(`Failed to map bridge due to error: ${e}`);
        }
        return null;
      })
      .filter((v: any) => v);
  }

  public async deposit(
    fromToken: string,
    toToken: string,
    toChain: string,
    toAddress: string | null,
    depositAmount: BigNumber,
  ): Promise<any> {
    const scaledNumber = depositAmount.multipliedBy(1e18).toString(10);
    const [currentAccount] = await this.web3.eth.getAccounts();
    if (toAddress === null) {
      toAddress = currentAccount;
    }
    const fromChain = this.currentNetwork.chainId;
    const rawBridge = await this.currentContract.methods
      .getBridgeBySourceAndTarget(fromToken, toToken, fromChain, toChain)
      .call();
    mapBridgeToEntityUnsafe(rawBridge['0']);
    return this.currentContract.methods
      .deposit(
        // token
        fromToken,
        toToken,
        // chain
        this.web3.utils.numberToHex(toChain),
        // address
        toAddress,
        // amount
        this.web3.utils.numberToHex(scaledNumber),
      )
      .send({ from: currentAccount });
  }

  /**
   * @deprecated use {StkrSdk#notarizeTransfer} instead
   */
  public async notarize(tx: string): Promise<string> {
    const fromChain = this.currentNetwork.tag;
    const stkrSdk = StkrSdk.getForEnv();
    const result = await stkrSdk.notarizeTransfer(fromChain, tx);
    return result.signature;
  }

  public async withdraw(
    fromToken: string,
    toToken: string,
    fromChain: string,
    fromAddress: string | null,
    withdrawAmount: string,
    txHash: string,
    signature: string,
    scale = true,
  ): Promise<any> {
    let scaledNumber;
    if (scale) {
      const amount = new BigNumber(withdrawAmount).multipliedBy(1e18);
      scaledNumber = amount.toString(10);
    } else {
      scaledNumber = withdrawAmount;
    }

    const [currentAccount] = await this.web3.eth.getAccounts();
    if (fromAddress === null) {
      fromAddress = currentAccount;
    }
    return this.currentContract.methods
      .withdraw(
        // token
        fromToken,
        toToken,
        // chain
        this.web3.utils.numberToHex(fromChain),
        // address
        fromAddress,
        // amount
        this.web3.utils.numberToHex(scaledNumber),
        // transaction hash with signature
        txHash,
        signature,
      )
      .send({ from: currentAccount });
  }

  public async withdrawAsync(
    fromToken: string,
    toToken: string,
    fromChain: string,
    fromAddress: string | null,
    withdrawAmount: string,
    txHash: string,
    signature: string,
  ): Promise<any> {
    const [currentAccount] = await this.web3.eth.getAccounts();
    if (fromAddress === null) {
      fromAddress = currentAccount;
    }

    const data: string = this.currentContract.methods
      .withdraw(
        // token
        fromToken,
        toToken,
        // chain
        this.web3.utils.numberToHex(fromChain),
        // address
        fromAddress,
        // amount
        this.web3.utils.numberToHex(withdrawAmount),
        // transaction hash with signature
        txHash,
        signature,
      )
      .encodeABI();

    return this.sendAsync(
      currentAccount,
      this.currentContractAddress,
      {
        data: data,
      },
      fromChain,
    );
    // .send({ from: currentAccount });
  }

  private async sendAsync(
    from: string,
    to: string,
    sendOptions: SendOptions,
    chainId: string,
  ): Promise<ISendAsyncResult> {
    const gasPrice = await this.web3.eth.getGasPrice();
    console.log('Gas Price: ' + gasPrice);
    const nonce = await this.web3.eth.getTransactionCount(from);
    console.log('Nonce: ' + nonce);
    const tx = {
      from: from,
      to: to,
      value: this.web3.utils.numberToHex(sendOptions.value || '0'),
      gas: this.web3.utils.numberToHex(sendOptions.gasLimit || '500000'),
      gasPrice: gasPrice,
      data: sendOptions.data,
      nonce: nonce,
      chainId: +chainId,
    };
    console.log('Sending transaction via Web3: ', tx);
    return new Promise<ISendAsyncResult>((resolve, reject) => {
      const promise = this.web3.eth.sendTransaction(tx);
      promise
        .once('transactionHash', async (transactionHash: string) => {
          console.log(`Just signed transaction has is: ${transactionHash}`);
          const rawTx = await this.web3.eth.getTransaction(transactionHash);
          console.log(
            `Found transaction in node: `,
            JSON.stringify(rawTx, null, 2),
          );
          const rawTxHex = this.tryGetRawTx(rawTx, chainId);
          resolve({
            receiptPromise: promise,
            transactionHash: transactionHash,
            rawTransaction: rawTxHex,
          });
        })
        .catch(reject);
    });
  }

  private tryGetRawTx(rawTx: any, chainId: string): string {
    const allowedChains = ['1', '3', '4', '42', '5'];
    if (!allowedChains.includes(`${chainId}`)) {
      console.warn(`raw tx can't be greated for this chain id ${chainId}`);
      return '';
    }
    const { v, r, s } = rawTx as any; /* this fields are not-documented */
    const newTx = new Transaction(
      {
        gasLimit: this.web3.utils.numberToHex(rawTx.gas),
        gasPrice: this.web3.utils.numberToHex(Number(rawTx.gasPrice)),
        to: `${rawTx.to}`,
        nonce: this.web3.utils.numberToHex(rawTx.nonce),
        data: rawTx.input,
        v: v,
        r: r,
        s: s,
        value: this.web3.utils.numberToHex(rawTx.value),
      },
      {
        chain: chainId,
      },
    );
    if (!newTx.verifySignature())
      throw new Error(`The signature is not valid for this transaction`);
    console.log(`New Tx: `, JSON.stringify(newTx, null, 2));
    const rawTxHex = newTx.serialize().toString('hex');
    console.log(`Raw transaction hex is: `, rawTxHex);
    return rawTxHex;
  }
}
