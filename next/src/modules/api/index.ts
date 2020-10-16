import { MetaMaskProvider } from './metamask';
import { KeyProvider } from './provider';
import { ContractManager } from './contract';
import { ApiGateway, SidecarReply } from './gateway';
import { StkrConfig } from './config';

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

  public async disconnect() {}

  public async authorize(ttl: number = 60 * 60 * 1000): Promise<void> {
    if (!this.keyProvider) throw new Error('Key provider must be connected');
    if (await this.isAuthorized()) return;
    const token = await this.keyProvider.signLoginData(ttl);
    const {
      status,
      statusText,
    } = await this.apiGateway.authorizeWithSignedData(token);
    if (status !== 200)
      throw new Error(`Unable to authenticate user (#${status}) ${statusText}`);
    localStorage[LOCAL_STORAGE_AUTHORIZATION_TOKEN_KEY] = token;
  }

  public createSidecarDownloadLink(sidecar: string): string {
    return this.apiGateway.createSidecarDownloadLink(sidecar);
  }

  public async createSidecar(): Promise<SidecarReply> {
    return this.apiGateway.createSidecar();
  }

  public async isAuthorized(): Promise<boolean> {
    if (this.apiGateway.isAuthorized()) return true;
    const existingToken = localStorage[LOCAL_STORAGE_AUTHORIZATION_TOKEN_KEY];
    if (!existingToken) return false;
    const { status } = await this.apiGateway.authorizeWithSignedData(
      existingToken,
    );
    if (status === 200) {
      return true;
    }
    delete localStorage[LOCAL_STORAGE_AUTHORIZATION_TOKEN_KEY];
    return false;
  }

  public async getProviders(): Promise<ProviderEntity[]> {
    return [];
  }

  public async getMicroPools(): Promise<MicroPoolEntity[]> {
    return [];
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

  public currentAccount(): string {
    if (!this.keyProvider) return '';
    return this.keyProvider?.currentAccount();
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

  public getApiGateway(): ApiGateway {
    return this.apiGateway;
  }
}
