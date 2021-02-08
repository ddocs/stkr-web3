import {
  IConnectResult,
  ISendAsyncResult,
  KeyProvider,
  Web3ModalKeyProvider,
} from './provider';
import {
  BinanceContractManager,
  EthereumContractManager,
  IContractManager,
} from './contract';
import {
  ApiGateway,
  IGlobalStatsReply,
  ISidecarReply,
  IStakerStats,
  IUserStakeReply,
} from './gateway';
import { configFromEnv, IStkrConfig } from './config';
import BigNumber from 'bignumber.js';
import { EventEmitter } from 'events';
import { ContractManagerEvent } from './event';
import { SendOptions } from 'web3-eth-contract';
import { VoteStatus } from '@ankr.com/stkr-jssdk';
import { GovernanceManager } from './governance';

interface IStakerSdk {
  allowTokens(remainingAllowance?: BigNumber): Promise<ISendAsyncResult>;

  waitForAllowance(remainingAllowance?: BigNumber): Promise<void>;

  stake(stakingAmount: BigNumber | BigNumber.Value): Promise<ISendAsyncResult>;

  unstake(): Promise<ISendAsyncResult>;

  getClaimableAethBalance(): Promise<BigNumber>;

  getNativeBalance(): Promise<BigNumber>;

  getEthBalance(): Promise<BigNumber>;

  getAnkrBalance(): Promise<BigNumber>;

  getAethBalance(): Promise<BigNumber>;

  getStakerStats(): Promise<IStakerStats>;

  claimAeth(): Promise<ISendAsyncResult>;

  getAethRatio(): Promise<BigNumber>;

  pendingStakesOf(token: string): Promise<BigNumber>;

  getAllowanceAmount(): Promise<BigNumber>;

  getStakerMinimalStakingAmount(): Promise<BigNumber>;

  getRemainingAllowance(): Promise<BigNumber>;
}

interface IProviderSdk {
  downloadSidecar(sidecar: string, platform: string): void;

  createSidecar(
    name: string,
    eth1Url: string,
    eth2Url?: string,
  ): Promise<ISidecarReply>;

  getProviderSidecars(): Promise<ISidecarReply[]>;

  topUpETH(amount: BigNumber): Promise<ISendAsyncResult>;

  topUpANKR(amount: BigNumber): Promise<ISendAsyncResult>;
}

interface IGovernanceSdk {
  isGovernanceSupported(): boolean;

  vote(
    proposalId: string,
    vote: VoteStatus,
    options?: SendOptions,
  ): Promise<any>;

  fetchProjects(): Promise<any>;

  createProject(
    timeSpan: number,
    topic: string,
    content: string,
    options?: SendOptions,
  ): Promise<any>;

  faucet(options?: SendOptions): Promise<any>;

  setAnkrAllowance(amount: string, options?: SendOptions): Promise<any>;

  getAnkrGovernanceAllowance(owner: string): Promise<any>;

  getProposalInfo(proposalId: string): Promise<any>;
}

export interface IStkrSdk extends IStakerSdk, IProviderSdk, IGovernanceSdk {
  createExplorerLink(txHash: string): string;

  authorizeProvider(ttl?: number): Promise<string>;

  isAuthorized(token?: string): Promise<boolean>;

  getContractManager(): IContractManager;

  getKeyProvider(): KeyProvider;

  getGovernanceManager(): GovernanceManager;

  getApiGateway(): ApiGateway;

  getEventEmitter(): EventEmitter;

  connect(): Promise<IConnectResult>;

  isConnected(): boolean;

  disconnect(): Promise<void>;

  currentAccountOrThrow(): string;

  currentAccount(): string;

  getGlobalStats(): Promise<IGlobalStatsReply>;
}

export class StkrSdk implements IStkrSdk {
  private static _cachedSdk: IStkrSdk | undefined;

  public static getForConfig(stkrConfig: IStkrConfig): IStkrSdk {
    const apiGateway = new ApiGateway(stkrConfig.gatewayConfig);
    return new StkrSdk(stkrConfig, apiGateway, new EventEmitter());
  }

  public static getForEnv(): IStkrSdk {
    if (StkrSdk._cachedSdk) return StkrSdk._cachedSdk;
    const stkrConfig = configFromEnv();
    StkrSdk._cachedSdk = StkrSdk.getForConfig(stkrConfig);
    return StkrSdk._cachedSdk;
  }

  private governanceManager: GovernanceManager | null = null;
  private keyProvider: KeyProvider | null = null;
  private contractManager: IContractManager | null = null;

  constructor(
    private stkrConfig: IStkrConfig,
    private apiGateway: ApiGateway,
    private eventEmitter: EventEmitter,
  ) {}

  public getApiGateway(): ApiGateway {
    return this.apiGateway;
  }

  public getEventEmitter(): EventEmitter {
    return this.eventEmitter;
  }

  public async connect(): Promise<IConnectResult> {
    this.keyProvider = new Web3ModalKeyProvider(
      this.stkrConfig.providerConfig,
      this.eventEmitter,
    );
    const result = await this.keyProvider.connect();
    if (this.keyProvider.isBinanceSmartChain()) {
      if (!this.stkrConfig.binanceConfig) {
        throw new Error(`BSC config is not provided`);
      }
      this.contractManager = new BinanceContractManager(
        this.eventEmitter,
        this.keyProvider,
        this.stkrConfig.binanceConfig,
      );
    } else {
      this.contractManager = new EthereumContractManager(
        this.eventEmitter,
        this.keyProvider,
        this.stkrConfig.contractConfig,
      );
    }
    await this.contractManager.connect();
    this.governanceManager = new GovernanceManager(this.keyProvider);
    return result;
  }

  public isConnected(): boolean {
    return !!this.keyProvider && !!this.contractManager;
  }

  public async disconnect(): Promise<void> {
    try {
      await this.getKeyProvider().disconnect();
    } catch (e) {
      console.error(`Failed to disconnect key provider: ${e}`);
    }
    try {
      await this.getApiGateway().logout();
    } catch (e) {
      console.error(`Failed to disconnect api gateway: ${e}`);
    }
    this.keyProvider = null;
    this.contractManager = null;
  }

  public createExplorerLink(txHash: string): string {
    const network = Number(this.getKeyProvider().currentNetwork());
    const urls: any = {
      1: 'https://etherscan.io/tx/{value}',
      5: 'https://goerli.etherscan.io/tx/{value}',
      56: 'https://testnet.bscscan.com/tx/{value}',
      97: 'https://testnet.bscscan.com/tx/{value}',
    };
    return (urls[network] || '').replace('{value}', txHash);
  }

  private static readonly TWELVE_HOURS = 12 * 60 * 60 * 1000;

  public async authorizeProvider(ttl?: number): Promise<string> {
    if (!this.keyProvider) {
      throw new Error('Key provider must be connected');
    }
    const token = await this.keyProvider.signLoginData(
      ttl || StkrSdk.TWELVE_HOURS,
    );
    await this.apiGateway.authorizeWithSignedData(token);
    return token;
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

  public downloadSidecar(sidecar: string, platform: string): void {
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
  ): Promise<ISidecarReply> {
    return this.apiGateway.createSidecar(name, eth1Url, eth2Url);
  }

  public async getProviderSidecars(): Promise<ISidecarReply[]> {
    return this.apiGateway.getProviderSidecars();
  }

  public async getAllowanceAmount(): Promise<BigNumber> {
    return await this.getContractManager().checkAnkrAllowance();
  }

  public async getStakerMinimalStakingAmount(): Promise<BigNumber> {
    return this.getContractManager().requesterMinimumStaking();
  }

  public async getRemainingAllowance(): Promise<BigNumber> {
    const allowanceAmount = await this.getAllowanceAmount(),
      minimalStaking = await this.getContractManager().providerMinimumStaking();
    return minimalStaking.minus(allowanceAmount);
  }

  public async allowTokens(
    remainingAllowance?: BigNumber,
  ): Promise<ISendAsyncResult> {
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
  ): Promise<ISendAsyncResult> {
    stakingAmount = new BigNumber(stakingAmount);
    const requesterMinimumStaking = await this.getStakerMinimalStakingAmount();
    if (stakingAmount.isLessThan(requesterMinimumStaking)) {
      throw new Error(
        `Minimum staking amount is ${requesterMinimumStaking.toString(10)}`,
      );
    }
    console.log(`staking funds ${stakingAmount.toString(10)} in global pool`);
    return this.getContractManager().stake(stakingAmount);
  }

  public async unstake(): Promise<ISendAsyncResult> {
    console.log(`unstaking funds from global pool`);
    return this.getContractManager().unstake();
  }

  public currentAccount(): string {
    if (!this.keyProvider) {
      return '';
    }
    return this.keyProvider.currentAccount();
  }

  public currentAccountOrThrow(): string {
    return this.getKeyProvider().currentAccount();
  }

  public async getGlobalStats(): Promise<IGlobalStatsReply> {
    return await this.apiGateway.getGlobalStats();
  }

  public getKeyProvider(): KeyProvider {
    if (!this.keyProvider) throw new Error('Key provider must be connected');
    return this.keyProvider;
  }

  public getContractManager(): IContractManager {
    if (!this.contractManager)
      throw new Error('Contract manager is not initialized');
    return this.contractManager;
  }

  public getGovernanceManager(): GovernanceManager {
    if (!this.governanceManager) throw new Error(`Governance is not available`);
    return this.governanceManager;
  }

  public async getClaimableAethBalance(): Promise<BigNumber> {
    if (this.getKeyProvider().isBinanceSmartChain()) {
      return new BigNumber('0');
    }
    const address = this.getKeyProvider().currentAccount();
    return this.getContractManager().claimableRewardOf(address);
  }

  public async getNativeBalance(): Promise<BigNumber> {
    const currentAccount = this.getKeyProvider().currentAccount();
    const balanceOf = await this.getKeyProvider().getNativeBalance(
      currentAccount,
    );
    return new BigNumber(balanceOf);
  }

  public async getEthBalance(): Promise<BigNumber> {
    const currentAccount = this.getKeyProvider().currentAccount();
    return this.getContractManager().etherBalanceOf(currentAccount);
  }

  public async getAnkrBalance(): Promise<BigNumber> {
    const currentAccount = this.getKeyProvider().currentAccount();
    if (this.getKeyProvider().isBinanceSmartChain()) {
      return new BigNumber('0');
    }
    return this.getContractManager().ankrBalanceOf(currentAccount);
  }

  public async getAethBalance(): Promise<BigNumber> {
    const currentAccount = this.getKeyProvider().currentAccount();
    return this.getContractManager().aethBalanceOf(currentAccount);
  }

  public async getStakerStats(): Promise<IStakerStats> {
    console.log('fetching stake events from smart contract...');
    const [pending, confirmed, removed, toppedUp] = await Promise.all([
      this.getContractManager().stakePendingEventLogs(),
      this.getContractManager().stakeConfirmedEventLogs(),
      this.getContractManager().stakeRemovedEventLogs(),
      this.getContractManager().providerToppedUpEthEventLogs(),
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
      (item): IUserStakeReply => {
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
      (item): IUserStakeReply => {
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
      (item): IUserStakeReply => {
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

  public async claimAeth(): Promise<ISendAsyncResult> {
    return await this.getContractManager().claim();
  }

  public async topUpETH(amount: BigNumber): Promise<ISendAsyncResult> {
    return await this.getContractManager().topUpETH(amount);
  }

  public async topUpANKR(amount: BigNumber): Promise<ISendAsyncResult> {
    return await this.getContractManager().topUpANKR(amount);
  }

  public async getAethRatio(): Promise<BigNumber> {
    if (this.getKeyProvider().isBinanceSmartChain()) {
      return new BigNumber('0');
    }
    return await this.getContractManager().aethRatio();
  }

  public async pendingStakesOf(token: string): Promise<BigNumber> {
    return await this.getContractManager().pendingStakesOf(token);
  }

  public isGovernanceSupported(): boolean {
    return !this.getKeyProvider().isBinanceSmartChain();
  }

  public async vote(
    proposalId: string,
    vote: VoteStatus,
    options?: SendOptions,
  ) {
    return this.getGovernanceManager().vote(proposalId, vote, options);
  }

  public async fetchProjects() {
    return this.getGovernanceManager().fetchProjects();
  }

  public async createProject(
    timeSpan: number,
    topic: string,
    content: string,
    options?: SendOptions,
  ) {
    return this.getGovernanceManager().createProject(
      timeSpan,
      topic,
      content,
      options,
    );
  }

  public async faucet(options?: SendOptions) {
    return this.getGovernanceManager().faucet(options);
  }

  public async setAnkrAllowance(amount: string, options?: SendOptions) {
    return this.getGovernanceManager().setAnkrAllowance(amount, options);
  }

  public async getAnkrGovernanceAllowance(owner: string) {
    return this.getGovernanceManager().getAnkrGovernanceAllowance(owner);
  }

  public async getProposalInfo(proposalId: string) {
    return this.getGovernanceManager().getProposalInfo(proposalId);
  }
}
