import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { StkrSdk } from '../../api';
import { EthereumContractManager } from '../../api/contract';
import ABI_AVALANCHE_POOL from '../../api/contract/AvalanchePool.json';
import ABI_FUTURE_BOND from '../../api/contract/FutureBondAVAX.json';
import { AvalanchePoolEvents } from '../../api/event';
import { ISendAsyncResult } from '../../api/provider';
import DEFAULT_CONFIG from './addresses.json';
import { IStakingEntry } from './types';
import { mapEventToTxType } from './utils';

export class AvalancheSdk {
  private static _cachedSdk: AvalancheSdk | undefined;
  private static _cacheChainId: number | undefined;

  static async connect() {
    await this.setCache();
    if (!this._cachedSdk)
      throw new Error('Avalanche SDK could not be initialized');
    this._cachedSdk.connect();
    return this._cachedSdk;
  }

  static async disconnect() {
    this._cachedSdk?.disconnect();
    delete this._cachedSdk;
  }

  static async isConnected() {
    const stkrSdk = StkrSdk.getForEnv();
    const selectedChainId = await stkrSdk
      .getKeyProvider()
      .getWeb3()
      .eth.getChainId();

    return this._cachedSdk && this._cacheChainId === selectedChainId;
  }

  private static async setCache() {
    const stkrSdk = StkrSdk.getForEnv();

    if (await this.isConnected()) {
      return this._cachedSdk;
    } else {
      this.disconnect();
    }

    this._cacheChainId = await stkrSdk
      .getKeyProvider()
      .getWeb3()
      .eth.getChainId();

    this._cachedSdk = await AvalancheSdk.fromConfigFile(
      stkrSdk.getKeyProvider().getWeb3(),
    );

    return this._cachedSdk;
  }

  private readonly poolContract: Contract | undefined = undefined;
  private readonly poolContractAddress: string | undefined = undefined;
  private readonly futureBondContract: Contract | undefined = undefined;

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
    }

    this.chainId = +chainId;
  }

  protected getPoolContract(): Contract {
    if (!this.poolContract) {
      throw new Error('Contract not avalable');
    }
    return this.poolContract;
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
    // follow pool and future bond events
  }

  private async disconnect() {
    //
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
    return new BigNumber(`${balance}`).dividedBy(
      new BigNumber(10).pow(decimals),
    );
  }

  public async getNativeBalance() {
    const [currentAccount] = await this.web3.eth.getAccounts();
    const balance = await this.web3.eth.getBalance(currentAccount);
    return new BigNumber(`${balance}`).dividedBy(new BigNumber(10).pow(18));
  }

  public async getUnstakedBalance(): Promise<BigNumber> {
    const [currentAccount] = await this.web3.eth.getAccounts();
    const poolContract = this.getPoolContract();
    const balance = await poolContract.methods
      .pendingAvaxClaimsOf(currentAccount)
      .call();
    return new BigNumber(Web3.utils.fromWei(balance));
  }

  public async getAAvaxBBalance() {
    if (!this.futureBondContract) {
      throw new Error('Contract not avalable');
    }
    const [currentAccount] = await this.web3.eth.getAccounts();
    const balance = await this.futureBondContract.methods
      .balanceOf(currentAccount)
      .call();
    const ratio = await this.futureBondContract.methods.ratio().call();
    const lastConfirmedRatio = await this.futureBondContract.methods
      .ratio()
      .call();
    const correctedBalance = new BigNumber(balance)
      .multipliedBy(new BigNumber(ratio))
      .dividedBy(new BigNumber(lastConfirmedRatio));

    const decimals = 18;
    return new BigNumber(`${correctedBalance}`).dividedBy(
      new BigNumber(10).pow(decimals),
    );
  }

  public async stake(stakeAmount: string): Promise<ISendAsyncResult> {
    const poolContract = this.getPoolContract();
    if (!this.poolContractAddress) {
      throw new Error('Contract not avalable');
    }
    const amount = new BigNumber(stakeAmount).multipliedBy(1e18);
    const scaledNumber = amount.toString(10);
    const [currentAccount] = await this.web3.eth.getAccounts();
    return await poolContract.methods.stake().send({
      from: currentAccount,
      value: scaledNumber,
    });
  }

  public async claim(amount: string): Promise<ISendAsyncResult> {
    const poolContract = this.getPoolContract();
    const [currentAccount] = await this.web3.eth.getAccounts();
    return poolContract.methods.claim(amount).send({
      from: currentAccount,
    });
  }

  public async fetchStakeLogs(): Promise<IStakingEntry[]> {
    const logs = await this.queryEventLogs(AvalanchePoolEvents.AllEvents);
    const filteredLogs = logs.filter(log => log.returnValues.amount);

    return await Promise.all(
      filteredLogs.map(async log => {
        const blockInfo = await this.web3.eth.getBlock(log.blockNumber);

        return {
          stakingDate: new Date(+blockInfo.timestamp * 1000).toLocaleString(),
          action: 'STAKE_ACTION_CONFIRMED',
          transactionHash: log.transactionHash,
          transactionType: mapEventToTxType(log.event),
          stakingAmount: new BigNumber(log.returnValues.amount).dividedBy(
            EthereumContractManager.ETH_SCALE_FACTOR,
          ),
        };
      }),
    );
  }

  private async queryEventLogs(eventName: string): Promise<any[]> {
    if (!this.poolContract) {
      return [];
    }
    const [currentAccount] = await this.web3.eth.getAccounts();
    const toBlock = await this.web3.eth.getBlockNumber();
    const fromBlock = toBlock - 130000; // approximately 5 days

    return await this.poolContract.getPastEvents(eventName, {
      fromBlock,
      toBlock,
      filter: {
        provider: currentAccount,
      },
    });
  }
}
