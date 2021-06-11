import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';

import ABI_AVALANCHE_POOL from '../api/contract/AvalanchePool.json';
import ABI_FUTURE_BOND from '../api/contract/FutureBondAVAX.json';

import DEFAULT_CONFIG from './addresses.json';

import BigNumber from 'bignumber.js';
import { ISendAsyncResult } from '../api/provider';
import { IStakingEntry } from './types';
import { EthereumContractManager } from '../api/contract';
import { AvalanchePoolEvents } from '../api/event';
import { StkrSdk } from '../api';

export class AvalancheSdk {
  private static _cachedSdk: AvalancheSdk | undefined;
  private static _cacheChainId: number | undefined;

  public static async instance() {
    const stkrSdk = StkrSdk.getForEnv();

    const selectedChainId = await stkrSdk
      .getKeyProvider()
      .getWeb3()
      .eth.getChainId();

    if (selectedChainId === this._cacheChainId && !!this._cachedSdk) {
      return this._cachedSdk;
    } else {
      !!this._cachedSdk && this._cachedSdk.disconnect();
    }

    this._cacheChainId = selectedChainId;

    this._cachedSdk = await AvalancheSdk.fromConfigFile(
      stkrSdk.getKeyProvider().getWeb3(),
    );

    return this._cachedSdk;
  }

  static async connect() {
    await this.instance();
    if (!this._cachedSdk)
      throw new Error('Avalance SDK could not be initialized');
    this._cachedSdk.connect();
    return this._cachedSdk;
  }

  static async disconnect() {
    this._cachedSdk?.disconnect();
    delete this._cachedSdk;
  }

  private readonly poolContract: Contract | undefined = undefined;
  private readonly poolContractAddress: string | undefined = undefined;
  private readonly futureBondContract: Contract | undefined = undefined;
  private readonly futureBondContractAddress: string | undefined = undefined;
  private readonly crossChainBridgeContractAddress:
    | string
    | undefined = undefined;
  public readonly chainId: number;

  private constructor(
    private readonly web3: Web3,
    configMap: Record<
      string,
      Record<
        string,
        {
          AvalanchePool: string;
          FutureBondAVAX: string;
          CrossChainBridge: string;
        }
      >
    >,
    chainId: number | string,
  ) {
    const env = process.env.REACT_APP_STKR_ENV
      ? process.env.REACT_APP_STKR_ENV
      : 'develop';
    const map = configMap[env];
    const entry = map[String(chainId)];
    if (!entry) {
      throw new Error('CrossChain is not supported by current chain');
    }
    if (entry.AvalanchePool) {
      this.poolContract = new web3.eth.Contract(
        ABI_AVALANCHE_POOL as any,
        entry.AvalanchePool,
      );
      this.poolContractAddress = entry.AvalanchePool;
    }

    if (entry.FutureBondAVAX) {
      this.futureBondContract = new web3.eth.Contract(
        ABI_FUTURE_BOND as any,
        entry.FutureBondAVAX,
      );
      this.futureBondContractAddress = entry.FutureBondAVAX;
    }

    if (entry.CrossChainBridge) {
      this.crossChainBridgeContractAddress = entry.CrossChainBridge;
    }

    this.futureBondContractAddress = entry.FutureBondAVAX;
    this.chainId = +chainId;
  }

  public static async fromConfigFile(web3: Web3): Promise<AvalancheSdk> {
    return AvalancheSdk.fromConfigMap(web3, DEFAULT_CONFIG as any);
  }

  public static async fromConfigMap(
    web3: Web3,
    configMap: Record<
      string,
      Record<
        string,
        {
          AvalanchePool: string;
          FutureBondAVAX: string;
          CrossChainBridge: string;
        }
      >
    >,
  ): Promise<AvalancheSdk> {
    const chainId = await web3.eth.getChainId();
    return new AvalancheSdk(web3, configMap, chainId);
  }

  private async connect() {
    // const [currentAccount] = await this.web3.eth.getAccounts();
    // const latestBlockHeight = await this.web3.eth.getBlockNumber();
    // console.dir({ latestBlockHeight });
    // this.poolContract?.events
    //   .StakePending({
    //     filter: { from: currentAccount },
    //     fromBlock: latestBlockHeight,
    //   })
    //   .on('data', () => alert(3));
  }

  private async disconnect() {
    return;
  }

  public async getClaimableAmount() {
    if (!this.futureBondContract) {
      throw new Error('Contract not avalable');
    }
    const [currentAccount] = await this.web3.eth.getAccounts();
    const balance = await this.futureBondContract.methods
      .balanceOf(currentAccount)
      .call();
    const decimals = 18;
    const result = new BigNumber(`${balance}`).dividedBy(
      new BigNumber(10).pow(decimals),
    );
    return result;
  }

  public async getNativeBalance() {
    const [currentAccount] = await this.web3.eth.getAccounts();
    const balance = await this.web3.eth.getBalance(currentAccount);
    return new BigNumber(`${balance}`).dividedBy(new BigNumber(10).pow(18));
  }

  public async getAAvaxBBalance() {
    if (!this.futureBondContract) {
      throw new Error('Contract not avalable');
    }
    const [currentAccount] = await this.web3.eth.getAccounts();
    const balance = await this.futureBondContract.methods
      .balanceOf(currentAccount)
      .call();
    const decimals = 18;
    const result = new BigNumber(`${balance}`).dividedBy(
      new BigNumber(10).pow(decimals),
    );
    return result;
  }

  public async stake(stakeAmount: string): Promise<ISendAsyncResult> {
    if (!this.poolContract || !this.poolContractAddress) {
      throw new Error('Contract not avalable');
    }
    const amount = new BigNumber(stakeAmount).multipliedBy(1e18);
    const scaledNumber = amount.toString(10);
    const [currentAccount] = await this.web3.eth.getAccounts();
    return await this.poolContract.methods.stake().send({
      from: currentAccount,
      value: scaledNumber,
    });
  }

  public async claim(amount: string): Promise<ISendAsyncResult> {
    if (!this.poolContract) {
      throw new Error('Contract not avalable');
    }
    const [currentAccount] = await this.web3.eth.getAccounts();
    return this.poolContract.methods.claim(amount).send({
      from: currentAccount,
    });
  }

  public async fetchStakeLogs(): Promise<IStakingEntry[]> {
    const fn = (eventLog: any) => {
      return {
        stakingDate: new Date().toDateString(),
        action: "STAKE_ACTION_CONFIRMED",
        transactionHash: eventLog.transactionHash,
        transactionType: "Stake",
        stakingAmount: new BigNumber(eventLog.returnValues.amount).dividedBy(
          EthereumContractManager.ETH_SCALE_FACTOR,
        ),
        eventLog,
      };
    };
    return this.queryPoolEventLogs(AvalanchePoolEvents.StakePending, fn);
  }

  private async queryPoolEventLogs(
    eventName: string,
    fn: (returnValues: any) => any,
  ): Promise<any[]> {
    if (!this.poolContract) {
      return [];
    }
    const [currentAccount] = await this.web3.eth.getAccounts();
    const latestBlock = await this.web3.eth.getBlockNumber();
    const events = await this.poolContract.getPastEvents(eventName, {
      fromBlock: latestBlock - 50000, // Number('12312');
      toBlock: latestBlock,
      filter: { staker: currentAccount },
    });
    return events.map(fn);
  }
}
