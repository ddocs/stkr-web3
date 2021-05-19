import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import BigNumber from 'bignumber.js';
import {
  DepositType,
  Megabytes,
  Percentage,
  Seconds,
} from '../../common/types';

export interface IGatewayConfig {
  baseUrl: string;
}

export interface IBalanceReply {
  available: string;
  timestamp: number;
}

export interface IAuthorizationReply {
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

export interface IMicroPoolReply {
  balance: string;
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

export type SidecarStatus =
  | 'SIDECAR_STATUS_UNKNOWN'
  | 'SIDECAR_STATUS_SYNCING'
  | 'SIDECAR_STATUS_ACTIVE'
  | 'SIDECAR_STATUS_DISABLED'
  | 'SIDECAR_STATUS_BLOCKED'
  | 'SIDECAR_STATUS_OFFLINE'
  | 'SIDECAR_STATUS_ATTESTING';

export interface ISidecarReply {
  id: string;
  provider: string;
  name?: string;
  status: SidecarStatus;
  machine?: {
    host: string;
    platform:
      | 'MACHINE_PLATFORM_UNKNOWN'
      | 'MACHINE_PLATFORM_WINDOWS_X86'
      | 'MACHINE_PLATFORM_WINDOWS_AMD64'
      | 'MACHINE_PLATFORM_LINUX_X86'
      | 'MACHINE_PLATFORM_LINUX_AMD64'
      | 'MACHINE_PLATFORM_DARWIN_X86'
      | 'MACHINE_PLATFORM_DARWIN_AMD64';
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
  };
  beaconChain?: {
    currentSlot: number;
    latestSlot: number;
    currentEpoch: number;
    latestEpoch: number;
    peerCount: number;
    syncing: boolean;
  };
  created: number;
}

export interface IGlobalStatsReply {
  activePoolCount: number;
  activeSidecarCount: number;
  pendingEthereum: string;
  replicationFactor: number;
  totalProviders: number;
  totalStakedEthereum: string;
  totalStakers: number;
  validatorCount: number;
}

export type UserStakeAction =
  | 'STAKE_ACTION_PENDING'
  | 'STAKE_ACTION_CONFIRMED'
  | 'STAKE_ACTION_UNSTAKE';

export interface IUserStakeReply {
  user: string;
  amount: BigNumber;
  transactionHash: string;
  action: UserStakeAction;
  timestamp: number;
  isTopUp: boolean;
  type: DepositType;
}

export interface IUserStatisticsReply {}

export interface IRatePriceReply {
  rate: number;
}

export interface IStakerStats {
  stakes: IUserStakeReply[];
}

export interface IConfigReply {
  AETH: string;
  Config: string;
  GlobalPool: string;
  SystemParameters: string;
  ANKR?: string;
  Staking?: string;
}

export interface INotarizeTransferReply {
  token?: string;
  toChain?: string;
  amount?: string;
  signature: string;
  recipient?: string;
}

export interface IConvertEstimateReply {
  validationEndTime: number; // miliseconds
  amountAvailable: BigNumber;
}

export interface INotarizeTransferRequest {
  fromChain: string;
  transactionHash: string;
}

export class ApiGateway {
  private readonly defaultConfig: AxiosRequestConfig;
  private api: AxiosInstance;
  private authorized = false;
  private token: string | null = null;

  constructor(private gatewayConfig: IGatewayConfig) {
    this.defaultConfig = {
      baseURL: gatewayConfig.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    };
    this.api = axios.create(this.defaultConfig);
    this.token = null;
  }

  public async downloadConfigFile(configFile: string): Promise<IConfigReply> {
    const { data } = await this.api.get<IConfigReply>(`${configFile}`);
    return data;
  }

  public createSidecarDownloadLink(sidecar: string, platform: string): string {
    return `${this.defaultConfig.baseURL}${this.api.getUri({
      url: `v1alpha/sidecar/${sidecar}/download/${platform}`,
    })}?token=${this.token}`;
  }

  public async authorizeWithSignedData(
    token: string,
  ): Promise<IAuthorizationReply> {
    this.api = axios.create(
      Object.assign({}, this.defaultConfig, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }),
    );
    if (this.authorized) throw new Error("You're already authorized");
    const { status, statusText, data } = await this.api.get<
      IAuthorizationReply
    >(`/v1alpha/auth`);
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
    return currentTime <= expires;
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

  public async createSidecar(
    name: string,
    eth1Url: string,
    eth2Url?: string,
  ): Promise<ISidecarReply> {
    const { status, data, statusText } = await this.api.post<ISidecarReply>(
      `/v1alpha/sidecar`,
      { name, eth1Url, eth2Url },
    );
    if (status !== 200)
      throw new Error(`Unable to fetch ethereum balance: ${statusText}`);
    return data;
  }

  public async getProviderSidecars(
    page: number | string = 0,
    size: number | string = 10,
  ): Promise<ISidecarReply[]> {
    const { status, data, statusText } = await this.api.get<ISidecarReply[]>(
      `/v1alpha/sidecar?size=${size}&page=${page}`,
    );
    if (status !== 200)
      throw new Error(`Unable to fetch ethereum balance: ${statusText}`);
    return data;
  }

  public async getEtheremBalance(address: string): Promise<IBalanceReply> {
    const { status, data, statusText } = await this.api.get<IBalanceReply>(
      `/v1alpha/balance/${address}/ethereum`,
    );
    if (status !== 200)
      throw new Error(`Unable to fetch ethereum balance: ${statusText}`);
    return data;
  }

  public async getAnkrBalance(address: string): Promise<IBalanceReply> {
    const { status, data, statusText } = await this.api.get<IBalanceReply>(
      `/v1alpha/balance/${address}/ankr`,
    );
    if (status !== 200)
      throw new Error(`Unable to fetch ethereum balance: ${statusText}`);
    return data;
  }

  public async getGlobalStats(): Promise<IGlobalStatsReply> {
    const { status, data } = await this.api.get<IGlobalStatsReply>(
      `/v1alpha/stats`,
    );
    if (status !== 200) throw new Error("Can't fetch statistics");
    return data;
  }

  public async getUserStakes(user: string): Promise<IUserStakeReply[]> {
    const { data } = await this.api.get<IUserStakeReply[]>(
      `/v1alpha/staker/stakes/${user}`,
    );
    return data;
  }

  // @TODO Remove
  public async getUserStatistics(user: string): Promise<IUserStatisticsReply> {
    const { data } = await this.api.get<IUserStatisticsReply>(
      `/v1alpha/staker/stats/${user}`,
    );
    return data;
  }

  public async getUsdPrice(baseCurrency: string): Promise<IRatePriceReply> {
    const { data } = await this.api.get<IRatePriceReply>(
      `/v1alpha/rate/${baseCurrency}`,
    );
    return data;
  }

  public async notarizeTransfer(
    request: INotarizeTransferRequest,
  ): Promise<INotarizeTransferReply> {
    console.log('[NOTARIZE] from chain' + request.fromChain);
    console.log('[NOTARIZE] tx hash' + request.transactionHash);
    const { status, data, statusText } = await this.api.post<
      INotarizeTransferReply
    >(`/v1alpha/bridge/notarize`, request);
    if (status !== 200)
      throw new Error(`Unable to fetch ethereum balance: ${statusText}`);
    return data;
  }

  public async getConversionEstimate(
    amount: string,
    token: string,
  ): Promise<IConvertEstimateReply> {
    const { status, data } = await this.api.get<IConvertEstimateReply>(
      `/v1alpha/${token.toLowerCase()}/claimservetime?amount=${amount}`,
    );
    if (status !== 200) throw new Error(`Unable to get conversion estimate`);
    return data;
  }
}
