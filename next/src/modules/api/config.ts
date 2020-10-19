import { ProviderConfig } from './provider';
import { ContractConfig } from './contract';
import { GatewayConfig } from './gateway';

export interface StkrConfig {
  providerConfig: ProviderConfig;
  contractConfig: ContractConfig;
  gatewayConfig: GatewayConfig;
}

// export const NETWORK_NAMES = {
//   '5': 'goerli',
// };

export enum NETWORK_NAMES {
  goerli = 5,
}

export const LOCAL_CONFIG: StkrConfig = {
  providerConfig: {
    networkId: '5',
    chainId: '5',
  },
  contractConfig: {
    microPoolContract: '0x93D11295a8Bff032763E4Df94De4Fb455803875E',
    ankrContract: '0x73ec423A2Ca297b2F34d017B538e7B314E4e1e3b',
    stakingContract: '0x570DED9A463fD20472153cEBa90a83C3A6c654CD',
    systemContract: '0x2c924B3f094554d2F77f417f88993E894cb5924c',
  },
  gatewayConfig: {
    baseUrl: 'http://localhost:8000',
  },
};

export const DEVELOP_CONFIG: StkrConfig = {
  providerConfig: {
    networkId: '5',
    chainId: '5',
  },
  contractConfig: {
    microPoolContract: '0x93D11295a8Bff032763E4Df94De4Fb455803875E',
    ankrContract: '0x73ec423A2Ca297b2F34d017B538e7B314E4e1e3b',
    stakingContract: '0x570DED9A463fD20472153cEBa90a83C3A6c654CD',
    systemContract: '0x2c924B3f094554d2F77f417f88993E894cb5924c',
  },
  gatewayConfig: {
    baseUrl: 'https://api.stkr-dev.ankr.com/',
  },
};
