import { MetaMaskProvider } from './metamask';
import { KeyProvider } from './provider';
import { ContractManager } from './contract';
import {
  ApiGateway,
  BalanceReply,
  MicroPoolReply,
  ProviderReply,
  SidecarReply,
  StatsReply,
} from './gateway';
import { NETWORK_NAMES, StkrConfig } from './config';
import { t } from '../../common/utils/intl';
import BigNumber from 'bignumber.js';

const LOCAL_STORAGE_AUTHORIZATION_TOKEN_KEY = '__stkr_authorization_token';

export interface ContractDetails {
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

  constructor(private stkrConfig: StkrConfig, private apiGateway: ApiGateway) {}

  static factoryDefault(stkrConfig: StkrConfig): StkrSdk {
    const apiGateway = new ApiGateway(stkrConfig.gatewayConfig);
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
    const metaMaskProvider = new MetaMaskProvider(
      this.stkrConfig.providerConfig,
    );
    await metaMaskProvider.connect();
    const contractManage = new ContractManager(
      metaMaskProvider,
      this.stkrConfig.contractConfig,
    );
    this.keyProvider = metaMaskProvider;
    this.contractManager = contractManage;
  }

  public async downloadContractDetails(): Promise<ContractDetails> {
    // @ts-ignore
    const networkName: string =
      NETWORK_NAMES[this.stkrConfig.providerConfig.networkId];
    const {
      AETH,
      ANKR,
      MarketPlace,
      MicroPool,
      Staking,
      SystemParameters,
    } = await this.apiGateway.downloadConfig(networkName);
    return {
      ankrEthContract: AETH,
      ankrContract: ANKR,
      marketPlaceContract: MarketPlace,
      microPoolContract: MicroPool,
      systemParametersContract: SystemParameters,
      stakingContract: Staking,
    };
  }

  public isConnected() {
    return this.keyProvider && this.contractManager;
  }

  public async disconnect() {
    await this.apiGateway.logout();
    this.keyProvider = null;
    this.contractManager = null;
    delete localStorage[LOCAL_STORAGE_AUTHORIZATION_TOKEN_KEY];
  }

  public async authorizeProvider(
    ttl: number = 12 * 60 * 60 * 1000,
  ): Promise<{ token: string }> {
    if (!this.keyProvider) {
      throw new Error('Key provider must be connected');
    }
    if (await this.isAuthorized()) {
      return { token: this.apiGateway.getToken() };
    }
    const token = await this.keyProvider.signLoginData(ttl);
    const {
      status,
      statusText,
    } = await this.apiGateway.authorizeWithSignedData(token);
    if (status !== 200) {
      throw new Error(`Unable to authenticate user (#${status}) ${statusText}`);
    }
    // TODO Remove
    localStorage[LOCAL_STORAGE_AUTHORIZATION_TOKEN_KEY] = token;
    return { token };
  }

  public createSidecarDownloadLink(sidecar: string): string {
    return this.apiGateway.createSidecarDownloadLink(sidecar);
  }

  public async createSidecar(): Promise<SidecarReply> {
    if (!(await this.isAuthorized())) throw new Error('Not authorized');
    return this.apiGateway.createSidecar();
  }

  public async getProviderSidecars(): Promise<SidecarReply[]> {
    if (!(await this.isAuthorized())) throw new Error('Not authorized');
    return this.apiGateway.getProviderSidecars();
  }

  public async isAuthorized(): Promise<boolean> {
    if (this.apiGateway.isAuthorized()) return true;
    const existingToken = localStorage[LOCAL_STORAGE_AUTHORIZATION_TOKEN_KEY];
    if (!existingToken) return false;
    try {
      const { status } = await this.apiGateway.authorizeWithSignedData(
        existingToken,
      );
      return status === 200;
    } catch (e) {
      console.warn(`unable to verify token: ${e.message}`);
    }
    delete localStorage[LOCAL_STORAGE_AUTHORIZATION_TOKEN_KEY];
    return false;
  }

  public async getProviders(
    page: number = 0,
    size: number = 100,
  ): Promise<ProviderReply[]> {
    return this.apiGateway.getProviders(page, size);
  }

  public async getMicroPools(
    page: number = 0,
    size: number = 100,
  ): Promise<MicroPoolReply[]> {
    return this.apiGateway.getMicroPools(page, size);
  }

  public async faucet(): Promise<void> {
    const contractManager = this.getContractManager();
    console.log(`calling faucet`);
    await contractManager.faucet();
  }

  public async createMicroPool(
    name: string,
    stakingAmount: BigNumber = new BigNumber('100000'),
  ): Promise<string> {
    const contractManager = this.getContractManager(),
      systemParams = await contractManager.getSystemContractParameters();
    console.log(`checking allowance`);
    const stakeAllowance = await contractManager.checkAnkrAllowance();
    console.log(
      `ankr staked allowance is ${stakeAllowance}, it should be greater than 100'000 ANKR`,
    );
    if (stakeAllowance.isLessThan(systemParams.providerMinimumStaking)) {
      const requiredMoreTokens = systemParams.providerMinimumStaking.minus(
        stakingAmount,
      );
      console.log(
        `you don't have enough ANKR tokens, need to approve ${requiredMoreTokens.toString()} more`,
      );
      await contractManager.approveAnkrToStakingContract(requiredMoreTokens);
      console.log(
        `successfully approved ${requiredMoreTokens.toString()} ANKR tokens for micro pool contract`,
      );
    }
    console.log(`initializing pool`);
    const txHash = await contractManager.initializePool(name);
    console.log(`created new micro pool, tx hash is ${txHash}`);
    return txHash;
  }

  public async getMicroPool(poolIndex: string | number): Promise<any> {
    if (!this.contractManager)
      throw new Error('Key provider must be connected');
    const result = await this.contractManager.poolDetails(`${poolIndex}`);
    console.log(`fetched micro pool details, result is ${result}`);
    return result;
  }

  public currentAccount(): string | undefined {
    if (!this.keyProvider) {
      return '';
    }
    return this.keyProvider?.currentAccount();
  }

  public async getStats(): Promise<StatsReply> {
    return this.apiGateway.getStats();
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

  public getApiGateway(): ApiGateway {
    return this.apiGateway;
  }
}
