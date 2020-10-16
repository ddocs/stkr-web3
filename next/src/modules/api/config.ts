import { ProviderConfig } from './provider';
import { ContractConfig } from './contract';
import { GatewayConfig } from './gateway';

export interface StkrConfig {
  providerConfig: ProviderConfig;
  contractConfig: ContractConfig;
  gatewayConfig: GatewayConfig;
}

export const LOCAL_CONFIG: StkrConfig = {
  providerConfig: {
    networkId: '5',
    chainId: '5',
  },
  contractConfig: {
    microPoolContract: '0xa70aB3d531a0580c881eD37F1d8a24eaED6A1692',
    ankrContract: '0xb5bb4478c8c5e6173214a033bdbe1467258d7c62',
  },
  gatewayConfig: {
    baseUrl: 'http://localhost:8000',
  },
};

export const GOERLI_CONFIG: StkrConfig = {
  providerConfig: {
    networkId: '5',
    chainId: '5',
  },
  contractConfig: {
    microPoolContract: '0xb59a85d80049472C9d66Da52400770B368183B92',
    ankrContract: '0xa46dd834953f51C57828f325D44B5B93A801168F',
  },
  gatewayConfig: {
    baseUrl: 'https://api.stkr-dev.ankr.com/',
  },
};
