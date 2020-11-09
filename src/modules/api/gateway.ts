/* eslint-disable @typescript-eslint/interface-name-prefix,@typescript-eslint/no-inferrable-types */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Megabytes, Percentage, Seconds } from '../../common/types';
import BigNumber from 'bignumber.js';

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
  balance: string; // / 32
  beaconDeposit: string;
  blockHeight: number;
  created: number;
  endTime: number;
  id: string;
  lastReward: string;
  lastSlashing: string;
  name: string;
  poolIndex: number;
  provider: string;
  publicKey: string;
  startTime: number;
  status: MicroPoolStatus;
  transactionHash: string;
  validator: string;
}

export interface SidecarStatusReply {
  machine: {
    hostId: string;
    platform: 'SIDECAR_PLATFORM_DARWIN';
    arch: 'SIDECAR_ARCH_AMD64';
    machineUptime: Seconds;
    currentTime: Seconds;
    totalMemory: Megabytes;
    freeMemory: Megabytes;
    totalDisk: Megabytes;
    freeDisk: Megabytes;
    numberOfCores: number;
    cpuModel: string;
    cpuUsage: Percentage[];
    cpuSpeed: number;
    hostPlatform: '';
  };
  beaconChain: {
    currentSlot: number;
    latestSlot: number;
    currentEpoch: number;
    latestEpoch: number;
    peerCount: number;
    syncing: boolean;
  };
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
  | 'VALIDATOR_STATUS_FREE'
  | 'VALIDATOR_STATUS_RESERVED';

export interface SidecarReply {
  id: string;
  provider: string;
  status: SidecarStatus;
  isOnline: boolean;
  created: number;
  registered: number;
  activated: number;
}

export interface ProviderStatsReply {
  totalEthereumStaked: string;
  totalProviders: number;
  totalMicroPools: number;
  totalStakers: number;
  monthlyEarnings: string;
  yearlyEarnings: string;
}

export type UserStakeAction =
  | 'STAKE_ACTION_PENDING'
  | 'STAKE_ACTION_STAKE'
  | 'STAKE_ACTION_UNSTAKE';

export interface UserStakeReply {
  user: string;
  amount: BigNumber;
  transactionHash: string;
  action: UserStakeAction;
  timestamp: number;
}

export interface UserStatisticsReply {
  totalStakedAmount: string;
  totalRewards: string;
}

export interface StakerStats {
  stakes: UserStakeReply[];
  stats: UserStatisticsReply;
}

export interface ConfigReply {
  contracts: {
    SystemParameters: string;
    DepositContract: string;
    MicroPool: string;
    MarketPlace: string;
    AETH: string;
    ANKR: string;
    Migrations: string;
    Staking: string;
  };
  network: {
    networkId: number;
    chainId: number;
  };
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

  public async downloadConfigFile(configFile: string): Promise<ConfigReply> {
    const { data } = await this.api.get<ConfigReply>(`/${configFile}`);
    return data;
  }

  public createSidecarDownloadLink(sidecar: string, platform: string): string {
    return `${this.defaultConfig.baseURL}${this.api.getUri({
      url: `v1alpha/sidecar/${sidecar}/download/${platform}`,
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

  public isAuthorized(currentAddress: string): boolean {
    if (!this.authorized || !this.token) return false;
    const parsedToken = this.parseToken();
    if (!parsedToken) return false;
    const { expires, address } = parsedToken,
      currentTime = new Date().getTime();
    if (currentAddress.toLowerCase() !== address.toLowerCase()) {
      return false;
    }
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

  public async createPendingMicroPool(
    rawTransaction: string,
  ): Promise<MicroPoolReply> {
    const { data } = await this.api.post<MicroPoolReply>(
      `/v1alpha/micropool/pending`,
      {
        rawTransaction: rawTransaction,
      },
    );
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

  public async getProviderStats(): Promise<ProviderStatsReply> {
    const { status, data } = await this.api.get<ProviderStatsReply>(
      `/v1alpha/stats`,
    );
    if (status !== 200) throw new Error("Can't fetch statistics");
    return data;
  }

  public async getUserStakes(user: string): Promise<UserStakeReply[]> {
    const { data } = await this.api.get<UserStakeReply[]>(
      `/v1alpha/staker/stakes/${user}`,
    );
    return data;
  }

  public async getUserStatistics(user: string): Promise<UserStatisticsReply> {
    const { data } = await this.api.get<UserStatisticsReply>(
      `/v1alpha/staker/stats/${user}`,
    );
    return data;
  }

  public async getSidecarStatus(
    sidecarId: string,
  ): Promise<SidecarStatusReply> {
    const { data } = await this.api.get<SidecarStatusReply>(
      `/v1alpha/sidecar/${sidecarId}/status`,
    );

    return data;
  }
}
