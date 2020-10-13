import { ProviderConfig } from './provider'
import { ContractConfig } from './contract'
import { GatewayConfig } from './gateway'

export interface StkrConfig {
  providerConfig: ProviderConfig,
  contractConfig: ContractConfig,
  gatewayConfig: GatewayConfig
}

export const LOCAL_CONFIG: StkrConfig = {
  providerConfig: {
    networkId: '5',
    chainId: '5'
  },
  contractConfig: {
    microPoolContract: '0xa70aB3d531a0580c881eD37F1d8a24eaED6A1692',
    ankrContract: ''
  },
  gatewayConfig: {
    baseUrl: 'http://localhost:8000'
  }
}

export const GOERLI_CONFIG: StkrConfig = {
  providerConfig: {
    networkId: '5',
    chainId: '5'
  },
  contractConfig: {
    microPoolContract: '0xa70aB3d531a0580c881eD37F1d8a24eaED6A1692',
    ankrContract: ''
  },
  gatewayConfig: {
    baseUrl: 'http://localhost:8000'
  }
}
