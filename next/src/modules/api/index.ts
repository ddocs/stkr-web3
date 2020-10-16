import { MetaMaskProvider } from './metamask';
import { KeyProvider } from './provider';
import { ContractManager } from './contract';
import { ApiGateway, BalanceReply, SidecarReply, StatsReply } from './gateway';
import { StkrConfig } from './config';
import { t } from '../../common/utils/intl';

interface ProviderEntity {}

interface MicroPoolEntity {}

const LOCAL_STORAGE_AUTHORIZATION_TOKEN_KEY = '__stkr_authorization_token';

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
    ttl: number = 60 * 60 * 1000,
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
    // TODO Remove
    localStorage[LOCAL_STORAGE_AUTHORIZATION_TOKEN_KEY] = token;
    return { token };
  }

  public createSidecarDownloadLink(sidecar: string): string {
    return this.apiGateway.createSidecarDownloadLink(sidecar);
  }

  public async createSidecar(): Promise<SidecarReply> {
    return this.apiGateway.createSidecar();
  }

  public async getProviderSidecars(): Promise<SidecarReply[]> {
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
  ): Promise<ProviderEntity[]> {
    return this.apiGateway.getProviders(page, size);
  }

  public async getMicroPools(
    page: number = 0,
    size: number = 100,
  ): Promise<MicroPoolEntity[]> {
    return this.apiGateway.getMicroPools(page, size);
  }

  public async createMicroPool(name: string): Promise<string> {
    if (!this.contractManager)
      throw new Error('Key provider must be connected');
    const txHash = await this.contractManager.initializePool(name);
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
    return {
      totalValueStaked: '1233000',
      stakersCount: 111,
      providersCount: 23,
    };
  }

  public getKeyProvider(): KeyProvider {
    if (!this.keyProvider) throw new Error('Key provider must be connected');
    return this.keyProvider;
  }

  public async getTotalValueStaked(): Promise<string> {
    return Promise.resolve('1000');
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
