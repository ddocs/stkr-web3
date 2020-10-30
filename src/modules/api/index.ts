import { MetaMaskProvider } from './metamask';
import { KeyProvider } from './provider';
import { ContractManager } from './contract';
import {
  ApiGateway,
  BalanceReply,
  MicroPoolReply,
  ProviderReply,
  ProviderStatsReply,
  SidecarReply,
  SidecarStatusReply,
  StakerStats,
} from './gateway';
import { IStkrConfig } from './config';
import { t } from '../../common/utils/intl';
import BigNumber from 'bignumber.js';

type TxHash = string;

export interface IContractDetails {
  ankrEthContract: string;
  ankrContract: string;
  marketPlaceContract: string;
  microPoolContract: string;
  systemParametersContract: string;
  stakingContract: string;
}

export class StkrSdk {
  private keyProvider: KeyProvider | null = null;
  private contractManager: ContractManager | null = null;

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
      throw t('user-actions.error.sdk-not-initialized');
    }
    return StkrSdk.instance;
  }

  public async connectMetaMask() {
    const config = await this.apiGateway.downloadConfigFile(
      this.stkrConfig.configFile,
    );
    console.log(
      `downloaded config from server: ${JSON.stringify(config, null, 2)}`,
    );
    const metaMaskProvider = new MetaMaskProvider({
      networkId: `${config.network.networkId}`,
      chainId: `${config.network.chainId}`,
    });
    await metaMaskProvider.connect();

    const contractManage = new ContractManager(metaMaskProvider, {
      ankrContract: config.contracts.ANKR,
      microPoolContract: config.contracts.MicroPool,
      stakingContract: config.contracts.Staking,
      systemContract: config.contracts.SystemParameters,
    });
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

    const {
      status,
      statusText,
    } = await this.apiGateway.authorizeWithSignedData(token);

    if (status !== 200) {
      throw new Error(`Unable to authenticate user (#${status}) ${statusText}`);
    }

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
    if (this.apiGateway.isAuthorized()) return true;
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

  public async getProviders(page = 0, size = 100): Promise<ProviderReply[]> {
    return this.apiGateway.getProviders(page, size);
  }

  public async getMicroPools(page = 0, size = 100): Promise<MicroPoolReply[]> {
    return this.apiGateway.getMicroPools(page, size);
  }

  public async faucet(): Promise<void> {
    const contractManager = this.getContractManager();
    console.log(`calling faucet`);
    await contractManager.faucet();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async reserveTokens() {}

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

  public async allowTokens(remainingAllowance?: BigNumber) {
    if (!remainingAllowance) {
      remainingAllowance = await this.getRemainingAllowance();
    }
    console.log(
      `going to approve ankr to staking contract ${remainingAllowance.toString(
        10,
      )}`,
    );
    return await this.getContractManager().approveAnkrToStakingContract(
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

  public async createAnkrMicroPool(name: string): Promise<TxHash> {
    const remainingAllowance = await this.getRemainingAllowance();
    if (remainingAllowance.isGreaterThan(0)) {
      await this.allowTokens(remainingAllowance);
    }
    return await this.getContractManager().initializePool(name);
  }

  public async createEthereumMicroPool(
    name: string,
    amount: BigNumber | null = null,
  ): Promise<TxHash> {
    const {
      ethereumStakingAmount,
    } = await this.getContractManager().getSystemContractParameters();
    if (!amount) {
      amount = ethereumStakingAmount;
    }
    return await this.getContractManager().initializePoolWithETH(name, amount);
  }

  public async stake(amount: BigNumber | string): Promise<void> {
    if (typeof amount === 'string') {
      amount = new BigNumber(amount);
    }
    const {
      requesterMinimumStaking,
    } = await this.getContractManager().getSystemContractParameters();
    if (amount.isLessThan(requesterMinimumStaking)) {
      throw new Error(
        `Minimum staking amount is ${requesterMinimumStaking.toString(10)}`,
      );
    }
    const pendingPools = (await this.getApiGateway().getMicroPools()).filter(
      microPool => microPool.status === 'MICRO_POOL_STATUS_PENDING',
    );
    if (pendingPools.length === 0) {
      throw new Error('There is no pending pools');
    }
    /* TODO: "let take first pending pool for the first time" */
    const [pool] = pendingPools;
    console.log(
      `staking funds ${amount.toString(10)} in ${pool.poolIndex.toString(
        10,
      )} pool`,
    );
    const txHash = await this.getContractManager().stake(
      new BigNumber(pool.poolIndex),
      amount,
    );
    console.log(`successfully staked funds in pool, tx hash is ${txHash}`);
  }

  public async getMicroPool(poolIndex: string | number): Promise<any> {
    const result = await this.getContractManager().poolDetails(`${poolIndex}`);
    console.log(`fetched micro pool details, result is ${result}`);
    return result;
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
    const user = this.getKeyProvider().currentAccount();
    const [stakes, stats] = await Promise.all([
      this.getApiGateway().getUserStakes(user),
      this.getApiGateway().getUserStatistics(user),
    ]);
    return { stakes, stats };
  }

  public getApiGateway(): ApiGateway {
    return this.apiGateway;
  }
}
