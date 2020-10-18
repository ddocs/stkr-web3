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
    microPoolContract: '0x3b2a3E894Bb62d254fF4B0584204Cb60744d4A32',
    ankrContract: '0x147ca0f5BB0D2E1cBf69842E45D0748247784879',
  },
  gatewayConfig: {
    baseUrl: 'https://api.stkr-dev.ankr.com/',
  },
};
