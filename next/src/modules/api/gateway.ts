import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface GatewayConfig {
  baseUrl: string;
}

export interface BalanceReply {
  available: string;
  timestamp: number;
}

export interface AuthorizationReply {
  address?: string;
  expiresAfter?: number;
  timeToLive?: number;
  status: number;
  statusText: string;
}

export type MicroPoolStatus =
  | 'MICRO_POOL_STATUS_PENDING'
  | 'MICRO_POOL_STATUS_ONGOING'
  | 'MICRO_POOL_STATUS_COMPLETED'
  | 'MICRO_POOL_STATUS_CANCELED';

export interface MicroPoolReply {
  id: string;
  status: MicroPoolStatus;
  provider: string;
  name: string;
  startTime: number;
  endTime: number;
  rewardBalance: string;
  claimedBalance: string;
  compensatedBalance: string;
  providerOwe: string;
  totalStakedAmount: string;
  numberOfSlashing: number;
  nodeFee: string;
  totalSlashedAmount: string;
  validator: string;
  created: number;
}

export type ProviderStatus =
  | 'PROVIDER_STATUS_ACTIVE'
  | 'PROVIDER_STATUS_BANNED';

export interface ProviderReply {
  id: string;
  status: ProviderStatus;
  created: number;
  banned?: number;
}

export type SidecarStatus =
  | 'SIDECAR_STATUS_CREATED'
  | 'SIDECAR_STATUS_REGISTERED'
  | 'SIDECAR_STATUS_ACTIVATED'
  | 'SIDECAR_STATUS_DELETED';

export interface SidecarReply {
  id: string;
  provider: string;
  status: SidecarStatus;
  isOnline: boolean;
  created: number;
  registered: number;
  activated: number;
}

export interface StatsReply {
  totalValueStaked: string;
  stakersCount: number;
  providersCount: number;
}

export class ApiGateway {
  private readonly defaultConfig: AxiosRequestConfig;
  private api: AxiosInstance;
  private authorized: boolean = false;
  private token: string | null = null;

  constructor(private gatewayConfig: GatewayConfig) {
    this.defaultConfig = {
      baseURL: gatewayConfig.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
    };
    this.api = axios.create(this.defaultConfig);
    this.token = null;
  }

  public createSidecarDownloadLink(sidecar: string): string {
    return `${this.defaultConfig.baseURL}${this.api.getUri({
      url: `/v1alpha/sidecar/download/${sidecar}`,
    })}?token=${this.token}`;
  }

  public async authorizeWithSignedData(
    token: string,
  ): Promise<AuthorizationReply> {
    this.api = axios.create(
      Object.assign({}, this.defaultConfig, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    if (this.authorized) throw new Error("You're already authorized");
    const { status, statusText, data } = await this.api.get<AuthorizationReply>(
      `/v1alpha/auth`,
    );
    if (status != 200) {
      return { status, statusText };
    }
    this.authorized = true;
    this.token = token;
    return Object.assign({}, data, { status, statusText });
  }

  public isAuthorized(): boolean {
    return this.authorized;
  }

  public async logout(): Promise<void> {
    this.authorized = false;
    this.token = null;
  }

  public async createSidecar(): Promise<SidecarReply> {
    const { status, data, statusText } = await this.api.post<SidecarReply>(
      `/v1alpha/sidecar`,
    );
    if (status !== 200)
      throw new Error(`Unable to fetch ethereum balance: ${statusText}`);
    return data;
  }

  public async getEtheremBalance(address: string): Promise<BalanceReply> {
    const { status, data, statusText } = await this.api.get<BalanceReply>(
      `/v1alpha/balance/${address}/ethereum`,
    );
    if (status !== 200)
      throw new Error(`Unable to fetch ethereum balance: ${statusText}`);
    return data;
  }

  public async getAnkrBalance(address: string): Promise<BalanceReply> {
    const { status, data, statusText } = await this.api.get<BalanceReply>(
      `/v1alpha/balance/${address}/ankr`,
    );
    if (status !== 200)
      throw new Error(`Unable to fetch ethereum balance: ${statusText}`);
    return data;
  }

  public async getMicroPools(
    page: number = 0,
    size: number = 100,
  ): Promise<MicroPoolReply[]> {
    const { status, data, statusText } = await this.api.get<MicroPoolReply[]>(
      `/v1alpha/micropool/`,
      {
        params: { page, size },
      },
    );
    if (status !== 200)
      throw new Error(`Unable to fetch micro pools: ${statusText}`);
    return data;
  }

  public async getMicroPoolsByProvider(
    provider: string,
    page: number = 0,
    size: number = 100,
  ): Promise<MicroPoolReply[]> {
    const { status, data, statusText } = await this.api.get<MicroPoolReply[]>(
      `/v1alpha/micropool/${provider}/`,
      {
        params: { page, size },
      },
    );
    if (status !== 200)
      throw new Error(`Unable to fetch micro pools: ${statusText}`);
    return data;
  }

  public async getProviders(
    page: number = 0,
    size: number = 100,
  ): Promise<ProviderReply[]> {
    const { status, data, statusText } = await this.api.get<ProviderReply[]>(
      `/v1alpha/provider/`,
      {
        params: { page, size },
      },
    );
    if (status !== 200)
      throw new Error(`Unable to fetch providers: ${statusText}`);
    return data;
  }
}
