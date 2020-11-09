import { MetaMaskProvider } from './metamask';
import { KeyProvider, SendAsyncResult } from './provider';
import { ContractManager } from './contract';
import {
  ApiGateway,
  BalanceReply,
  ProviderStatsReply,
  SidecarReply,
  SidecarStatusReply,
  StakerStats,
  UserStakeReply,
} from './gateway';
import { IStkrConfig } from './config';
import BigNumber from 'bignumber.js';
import { EventEmitter } from 'events';
import { TransactionReceipt } from 'web3-core';
import { YEAR_INTEREST } from '../../common/const';

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

  public async connectMetaMask() {
    /* download config from server only if its not provided yet */
    if (!this.stkrConfig.providerConfig || !this.stkrConfig.contractConfig) {
      const config = await this.apiGateway.downloadConfigFile(
        this.stkrConfig.configFile,
      );
      console.log(
        `downloaded config from server: ${JSON.stringify(config, null, 2)}`,
      );
      this.stkrConfig.providerConfig = {
        networkId: `${config.network.networkId}`,
        chainId: `${config.network.chainId}`,
      };
      this.stkrConfig.contractConfig = {
        aethContract: config.contracts.AETH,
        microPoolContract: config.contracts.MicroPool,
        ankrContract: config.contracts.ANKR,
        stakingContract: config.contracts.Staking,
        systemContract: config.contracts.SystemParameters,
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

  public createSidecarDownloadLink(sidecar: string, platform: string): string {
    return this.apiGateway.createSidecarDownloadLink(sidecar, platform);
  }

  public async createSidecar(): Promise<SidecarReply> {
    return this.apiGateway.createSidecar();
  }

  public async getProviderSidecars(): Promise<SidecarReply[]> {
    return this.apiGateway.getProviderSidecars();
  }

  public async getSidecarStatus(
    sidecarId: string,
  ): Promise<SidecarStatusReply> {
    return this.apiGateway.getSidecarStatus(sidecarId);
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
        // @ts-ignore
        if (!remainingAmount.lt(remainingAllowance)) {
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

  public currentAccount(): string | undefined {
    if (!this.keyProvider) {
      return '';
    }
    return this.keyProvider?.currentAccount();
  }

  public async getProviderStats(): Promise<ProviderStatsReply> {
    return this.apiGateway.getProviderStats();
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
    const currentAccount = this.getKeyProvider().currentAccount(),
      balanceOf = await this.getKeyProvider().ethereumBalance(currentAccount);
    return { available: balanceOf, timestamp: new Date().getTime() };
  }

  public async getAnkrBalance(): Promise<BalanceReply> {
    const currentAccount = this.getKeyProvider().currentAccount(),
      balanceOf = await this.getContractManager().ankrBalance(currentAccount);
    return { available: balanceOf, timestamp: new Date().getTime() };
  }

  public async getStakerStats(): Promise<StakerStats> {
    console.log('fetching stake events from smart contract...');
    const [pending, confirmed, removed] = await Promise.all([
      this.getContractManager().queryStakePendingEventLogs(),
      this.getContractManager().queryStakeConfirmedEventLogs(),
      this.getContractManager().queryStakeRemovedEventLogs(),
    ]);
    console.log(
      `found ${pending.length} pending, ${confirmed.length} confirmed and ${removed.length} removed events`,
    );
    const stakes = [
      ...pending.map(
        (event): UserStakeReply => {
          return {
            user: event.data.staker,
            amount: event.data.amount,
            transactionHash: event.data.eventData.transactionHash,
            action: 'STAKE_ACTION_PENDING',
            timestamp: 0,
          };
        },
      ),
      ...confirmed.map(
        (event): UserStakeReply => {
          return {
            user: event.data.staker,
            amount: event.data.amount,
            transactionHash: event.data.eventData.transactionHash,
            action: 'STAKE_ACTION_CONFIRMED',
            timestamp: 0,
          };
        },
      ),
      ...removed.map(
        (event): UserStakeReply => {
          return {
            user: event.data.staker,
            amount: event.data.amount,
            transactionHash: event.data.eventData.transactionHash,
            action: 'STAKE_ACTION_UNSTAKE',
            timestamp: 0,
          };
        },
      ),
    ];
    const totalStakedAmount = stakes.reduce(
        (result, stake) => result.plus(stake.amount),
        new BigNumber(0),
      ),
      totalRewards = totalStakedAmount.multipliedBy(YEAR_INTEREST);
    console.log(`total staked amount is ${totalStakedAmount.toString(10)}`);
    const stats = {
      totalRewards: totalRewards.toString(10),
      totalStakedAmount: totalStakedAmount.toString(10),
    };
    return { stakes, stats };
  }

  public getApiGateway(): ApiGateway {
    throw new Error("don't use ApiGateway");
  }

  public getEventEmitter(): EventEmitter {
    return this.eventEmitter;
  }

  public async claimAeth() {
    return await this.getContractManager().claim();
  }
}
