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
  poolIndex: number;
  name: string;
  startTime: number;
  endTime: number;
  lastReward: string;
  lastSlashing: string;
  balance: string;
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
  totalEthereumStaked: string;
  totalProviders: number;
  totalMicroPools: number;
  totalStakers: number;
  monthlyEarnings: string;
  yearlyEarnings: string;
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
    if (status !== 200) {
      return { status, statusText };
    }
    this.authorized = true;
    this.token = token;
    return Object.assign({}, data, { status, statusText });
  }

  public isAuthorized(): boolean {
    if (!this.authorized || !this.token) return false;
    const parsedToken = this.parseToken();
    if (!parsedToken) return false;
    const { expires } = parsedToken,
      currentTime = new Date().getTime();
    return currentTime < expires;
  }

  public parseToken(): {
    signature: string;
    address: string;
    expires: number;
  } | null {
    if (!this.token) return null;
    const decodedToken = new Buffer(this.token, 'base64').toString();
    return decodedToken.split('&').reduce((r: any, v: string) => {
      const [key, value] = v.split('=');
      return { ...r, [key]: value };
    }, {});
  }

  public getToken(): string {
    if (!this.token) throw new Error('Not authorized');
    return this.token;
  }

  public async logout(): Promise<void> {
    this.authorized = false;
    this.token = null;
  }

  public async downloadConfig(networkName: string): Promise<any> {
    const { data } = await this.api.get(`/${networkName}.json`);
    return data;
  }

  public async createSidecar(): Promise<SidecarReply> {
    const { status, data, statusText } = await this.api.post<SidecarReply>(
      `/v1alpha/sidecar`,
    );
    if (status !== 200)
      throw new Error(`Unable to fetch ethereum balance: ${statusText}`);
    return data;
  }

  public async getProviderSidecars(): Promise<SidecarReply[]> {
    const { status, data, statusText } = await this.api.get<SidecarReply[]>(
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

  public async getStats(): Promise<StatsReply> {
    const { status, data } = await this.api.get<StatsReply>(`/v1alpha/stats`);
    if (status !== 200) throw new Error("Can't fetch statistics");
    return data;
  }

  public async startSidecar(sidecar: string): Promise<{}> {
    const { status, data } = await this.api.post(`/v1alpha/sidecar/start`, {
      sidecar,
    });
    if (status !== 200) throw new Error("Can't fetch statistics");
    return data;
  }
}
