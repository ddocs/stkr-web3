import { MetaMaskProvider } from './metaMaskProvider';
import { KeyProvider, SendAsyncResult } from './provider';
import { ContractManager } from './contract';
import {
  ApiGateway,
  BalanceReply,
  GlobalStatsReply,
  SidecarReply,
  StakerStats,
  UserStakeReply,
} from './gateway';
import { IStkrConfig } from './config';
import BigNumber from 'bignumber.js';
import { EventEmitter } from 'events';
import { TransactionReceipt } from 'web3-core';
import { ContractManagerEvent } from './event';
import { SendOptions } from 'web3-eth-contract';

export interface IStakeAction extends SendAsyncResult {
  waitForTxReceipt(): Promise<TransactionReceipt>;
}

export class StkrSdk {
  private keyProvider: KeyProvider | null = null;
  private contractManager: ContractManager | null = null;
  private eventEmitter: EventEmitter = new EventEmitter();

  constructor(
    private stkrConfig: IStkrConfig,
    private apiGateway: ApiGateway,
  ) {}

  static factoryDefault(stkrConfig: IStkrConfig): StkrSdk {
    const apiGateway = new ApiGateway({
      baseUrl: stkrConfig.baseUrl,
    });
    StkrSdk.instance = new StkrSdk(stkrConfig, apiGateway);
    return StkrSdk.instance;
  }

  private static instance: StkrSdk | undefined = undefined;

  static getLastInstance() {
    if (!StkrSdk.instance) {
      throw new Error('SDK is not initialized yet');
    }
    return StkrSdk.instance;
  }

  public async connect() {
    /* download config from server only if its not provided yet */

    if (!this.stkrConfig.contractConfig) {
      const config = await this.apiGateway.downloadConfigFile(
        this.stkrConfig.configUrl,
      );
      console.log(
        `downloaded config from server: ${JSON.stringify(config, null, 2)}`,
      );
      this.stkrConfig.contractConfig = {
        aethContract: config.AETH,
        microPoolContract: config.GlobalPool,
        ankrContract: config.ANKR,
        stakingContract: config.Staking,
        systemContract: config.SystemParameters,
      };
    }
    const metaMaskProvider = new MetaMaskProvider(
      this.stkrConfig.providerConfig,
      this.eventEmitter,
    );
    await metaMaskProvider.connect();
    const contractManage = new ContractManager(
      metaMaskProvider,
      this.stkrConfig.contractConfig,
      this.eventEmitter,
    );
    this.keyProvider = metaMaskProvider;
    this.contractManager = contractManage;
  }

  public isConnected() {
    return this.keyProvider && this.contractManager;
  }

  public async disconnect() {
    await this.getKeyProvider()?.disconnect();
    await this.apiGateway.logout();
    this.keyProvider = null;
    this.contractManager = null;
  }

  public async authorizeProvider(
    ttl: number = 12 * 60 * 60 * 1000,
  ): Promise<{ token: string }> {
    if (!this.keyProvider) {
      throw new Error('Key provider must be connected');
    }
    const token = await this.keyProvider.signLoginData(ttl);
    await this.apiGateway.authorizeWithSignedData(token);
    return { token };
  }

  public downloadSidecar(sidecar: string, platform: string) {
    const downloadLink = this.apiGateway.createSidecarDownloadLink(
      sidecar,
      platform,
    );
    window.open(downloadLink);
  }

  public async createSidecar(
    name: string,
    eth1Url: string,
    eth2Url?: string,
  ): Promise<SidecarReply> {
    return this.apiGateway.createSidecar(name, eth1Url, eth2Url);
  }

  public async getProviderSidecars(): Promise<SidecarReply[]> {
    return this.apiGateway.getProviderSidecars();
  }

  public async isAuthorized(token?: string): Promise<boolean> {
    const currentAccount = this.getKeyProvider().currentAccount();
    if (this.apiGateway.isAuthorized(currentAccount)) return true;
    const existingToken = token;
    if (!existingToken) return false;
    try {
      const { status } = await this.apiGateway.authorizeWithSignedData(
        existingToken,
      );
      return status === 200;
    } catch (e) {
      console.warn(`unable to verify token: ${e.message}`);
    }
    return false;
  }

  public async faucet(): Promise<void> {
    const contractManager = this.getContractManager();
    await contractManager.faucet();
  }

  public async getAllowanceAmount() {
    return await this.getContractManager().checkAnkrAllowance();
  }

  public async getProviderMinimalStakingAmount() {
    const systemParams = await this.getContractManager().getSystemContractParameters();
    return systemParams.providerMinimumStaking;
  }

  public async getRemainingAllowance() {
    const allowanceAmount = await this.getAllowanceAmount();
    const minimalStaking = await this.getProviderMinimalStakingAmount();
    return minimalStaking.minus(allowanceAmount);
  }

  public async allowTokens(
    remainingAllowance?: BigNumber,
  ): Promise<SendAsyncResult> {
    if (!remainingAllowance) {
      remainingAllowance = await this.getRemainingAllowance();
    }
    console.log(
      `going to approve ankr to staking contract ${remainingAllowance.toString(
        10,
      )}`,
    );
    return this.getContractManager().approveAnkrToStakingContract(
      remainingAllowance,
    );
  }

  public async waitForAllowance(remainingAllowance?: BigNumber): Promise<void> {
    if (!remainingAllowance) {
      remainingAllowance = await this.getRemainingAllowance();
    }
    return new Promise(resolve => {
      const CHECK_INTERVAL = 5000;
      const checkFunction = async () => {
        const remainingAmount = await this.getRemainingAllowance();
        if (!remainingAmount.lt(remainingAllowance as any)) {
          return;
        }
        resolve();
      };
      setTimeout(checkFunction, CHECK_INTERVAL);
    });
  }

  public async stake(
    stakingAmount: BigNumber | BigNumber.Value,
  ): Promise<SendAsyncResult> {
    stakingAmount = new BigNumber(stakingAmount);
    const {
      requesterMinimumStaking,
    } = await this.getContractManager().getSystemContractParameters();
    if (stakingAmount.isLessThan(requesterMinimumStaking)) {
      throw new Error(
        `Minimum staking amount is ${requesterMinimumStaking.toString(10)}`,
      );
    }
    console.log(`staking funds ${stakingAmount.toString(10)} in global pool`);
    return this.getContractManager().stake(stakingAmount);
  }

  public async unstake(): Promise<SendAsyncResult> {
    console.log(`unstaking funds from global pool`);
    return this.getContractManager().unstake();
  }

  public currentAccount(): string | undefined {
    if (!this.keyProvider) {
      return '';
    }
    return this.keyProvider?.currentAccount();
  }

  public async getGlobalStats(): Promise<GlobalStatsReply> {
    return await this.apiGateway.getGlobalStats();
  }

  public getKeyProvider(): KeyProvider {
    if (!this.keyProvider) throw new Error('Key provider must be connected');
    return this.keyProvider;
  }

  public getContractManager(): ContractManager {
    if (!this.contractManager)
      throw new Error('Key provider must be connected');
    return this.contractManager;
  }

  public async getEtheremBalance(): Promise<BalanceReply> {
    const currentAccount = this.getKeyProvider().currentAccount();
    const balanceOf = await this.getKeyProvider().ethereumBalance(
      currentAccount,
    );
    return { available: balanceOf, timestamp: new Date().getTime() };
  }

  public async getAnkrBalance(): Promise<BalanceReply> {
    const currentAccount = this.getKeyProvider().currentAccount();
    const balanceOf = await this.getContractManager().ankrBalance(
      currentAccount,
    );
    return { available: balanceOf, timestamp: new Date().getTime() };
  }

  public async getAethBalance(): Promise<BalanceReply> {
    const currentAccount = this.getKeyProvider().currentAccount();
    const balanceOf = await this.getContractManager().aEthBalance(
      currentAccount,
    );
    return { available: balanceOf, timestamp: new Date().getTime() };
  }

  public async getStakerStats(): Promise<StakerStats> {
    console.log('fetching stake events from smart contract...');
    const [toppedUp, pending, confirmed, removed] = await Promise.all([
      this.getContractManager().queryProviderToppedUpEthEventLogs(),
      this.getContractManager().queryStakePendingEventLogs(),
      this.getContractManager().queryStakeConfirmedEventLogs(),
      this.getContractManager().queryStakeRemovedEventLogs(),
    ]);

    function hasItem(
      items: ContractManagerEvent[],
      item: ContractManagerEvent,
    ) {
      return items.some(
        toppedUpItem =>
          toppedUpItem.data.eventLog.transactionHash ===
          item.data.eventLog.transactionHash,
      );
    }

    const pendingItems = pending.map(
      (item): UserStakeReply => {
        return {
          user: item.data.staker,
          amount: item.data.amount,
          transactionHash: item.data.eventLog.transactionHash,
          action: 'STAKE_ACTION_PENDING',
          timestamp: item.data.eventLog.blockNumber,
          isTopUp: hasItem(toppedUp, item),
        };
      },
    );

    const confirmedItems = confirmed.map(
      (item): UserStakeReply => {
        return {
          user: item.data.staker,
          amount: item.data.amount,
          transactionHash: item.data.eventLog.transactionHash,
          action: 'STAKE_ACTION_CONFIRMED',
          timestamp: item.data.eventLog.blockNumber,
          isTopUp: hasItem(toppedUp, item),
        };
      },
    );

    const unstakedItems = removed.map(
      (item): UserStakeReply => {
        return {
          user: item.data.staker,
          amount: item.data.amount,
          transactionHash: item.data.eventLog.transactionHash,
          action: 'STAKE_ACTION_UNSTAKE',
          timestamp: item.data.eventLog.blockNumber,
          isTopUp: hasItem(toppedUp, item),
        };
      },
    );

    const stakes = [...pendingItems, ...confirmedItems, ...unstakedItems].sort(
      (a, b) => a.timestamp - b.timestamp,
    );

    return { stakes };
  }

  public getApiGateway(): ApiGateway {
    return this.apiGateway;
  }

  public getEventEmitter(): EventEmitter {
    return this.eventEmitter;
  }

  public async claimAeth() {
    return await this.getContractManager().claim();
  }

  public async topUpETH(amount: BigNumber) {
    return await this.getContractManager().topUpETH(amount);
  }

  public async topUpANKR(amount: BigNumber) {
    return await this.getContractManager().topUpANKR(amount);
  }

  public async getAethRatio() {
    return await this.getContractManager().getAethRatio();
  }

  public async pendingStakesOf(token: string) {
    return await this.getContractManager().pendingStakesOf(token);
  }

  public async vote(proposalId: string, vote: string, options?: SendOptions) {
    return await this.getContractManager().vote(proposalId, vote, options);
  }

  public async propose(
    timeSpan: number,
    topic: string,
    content: string,
    options?: SendOptions,
  ) {
    return await this.getContractManager().propose(
      timeSpan,
      topic,
      content,
      options,
    );
  }

  public async fetchProjects() {
    return await this.getContractManager().fetchProjects();
  }
}
