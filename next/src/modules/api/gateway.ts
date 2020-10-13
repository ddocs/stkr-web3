import axios, { AxiosInstance } from 'axios'

export interface GatewayConfig {
  baseUrl: string
}

export interface BalanceReply {
  available: string,
  timestamp: number,
}

export type MicroPoolStatus =
  'MICRO_POOL_STATUS_PENDING' |
  'MICRO_POOL_STATUS_ONGOING' |
  'MICRO_POOL_STATUS_COMPLETED' |
  'MICRO_POOL_STATUS_CANCELED'

export interface MicroPoolReply {
  id: string,
  status: MicroPoolStatus,
  provider: string,
  name: string,
  startTime: number,
  endTime: number,
  rewardBalance: string,
  claimedBalance: string,
  compensatedBalance: string,
  providerOwe: string,
  totalStakedAmount: string,
  numberOfSlashing: number,
  nodeFee: string,
  totalSlashedAmount: string,
  validator: string,
  created: number,
}

export type ProviderStatus =
  'PROVIDER_STATUS_ACTIVE' |
  'PROVIDER_STATUS_BANNED'

export interface ProviderReply {
  id: string,
  status: ProviderStatus,
  created: number,
  banned?: number,
}

export class ApiGateway {

  private api: AxiosInstance

  constructor(private gatewayConfig: GatewayConfig) {
    this.api = axios.create({
      baseURL: gatewayConfig.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      responseType: 'json'
    })
  }

  public async getEtheremBalance(address: string): Promise<BalanceReply> {
    const { status, data, statusText } = await this.api.get<BalanceReply>(`/v1alpha/balance/${address}/ethereum`)
    if (status !== 200) throw new Error(`Unable to fetch ethereum balance: ${statusText}`)
    return data
  }

  public async getAnkrBalance(address: string): Promise<BalanceReply> {
    const { status, data, statusText } = await this.api.get<BalanceReply>(`/v1alpha/balance/${address}/ankr`)
    if (status !== 200) throw new Error(`Unable to fetch ethereum balance: ${statusText}`)
    return data
  }

  public async getMicroPools(page: number = 0, size: number = 100): Promise<MicroPoolReply[]> {
    const { status, data, statusText } = await this.api.get<MicroPoolReply[]>(`/v1alpha/micropool/`, {
      params: { page, size }
    })
    if (status !== 200) throw new Error(`Unable to fetch micro pools: ${statusText}`)
    return data
  }

  public async getMicroPoolsByProvider(provider: string, page: number = 0, size: number = 100): Promise<MicroPoolReply[]> {
    const { status, data, statusText } = await this.api.get<MicroPoolReply[]>(`/v1alpha/micropool/${provider}/`, {
      params: { page, size }
    })
    if (status !== 200) throw new Error(`Unable to fetch micro pools: ${statusText}`)
    return data
  }

  public async getProviders(page: number = 0, size: number = 100): Promise<ProviderReply[]> {
    const { status, data, statusText } = await this.api.get<ProviderReply[]>(`/v1alpha/provider/`, {
      params: { page, size }
    })
    if (status !== 200) throw new Error(`Unable to fetch providers: ${statusText}`)
    return data
  }
}
