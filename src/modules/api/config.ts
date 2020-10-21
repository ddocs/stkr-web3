/* eslint-disable @typescript-eslint/interface-name-prefix */
import { ProviderConfig } from './provider';
import { ContractConfig } from './contract';
import { GatewayConfig } from './gateway';

export interface StkrConfig {
  providerConfig: ProviderConfig;
  contractConfig: ContractConfig;
  gatewayConfig: GatewayConfig;
}

export enum NETWORK_NAMES {
  goerli = 5,
}

export const LOCAL_CONFIG: StkrConfig = {
  providerConfig: {
    networkId: '5',
    chainId: '5',
  },
  contractConfig: {
    microPoolContract: '0x206B7200e6E497E96c592c760a50f030fe146c28',
    ankrContract: '0xaA2B264cC4bb843a06254Ab1C47Cfce491A14052',
    stakingContract: '0x51b0b6b72684C68c8B8091d55ba155C503D44d78',
    systemContract: '0x40Eec3627A95c8fb969Bbf6769817cA3E021C289',
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
    microPoolContract: '0x206B7200e6E497E96c592c760a50f030fe146c28',
    ankrContract: '0xaA2B264cC4bb843a06254Ab1C47Cfce491A14052',
    stakingContract: '0x51b0b6b72684C68c8B8091d55ba155C503D44d78',
    systemContract: '0x40Eec3627A95c8fb969Bbf6769817cA3E021C289',
  },
  gatewayConfig: {
    baseUrl: 'https://api.stkr-dev.ankr.com/',
  },
};

export const GOERLI_CONFIG: StkrConfig = {
  providerConfig: {
    networkId: '5',
    chainId: '5',
  },
  contractConfig: {
    microPoolContract: '0x206B7200e6E497E96c592c760a50f030fe146c28',
    ankrContract: '0xaA2B264cC4bb843a06254Ab1C47Cfce491A14052',
    stakingContract: '0x51b0b6b72684C68c8B8091d55ba155C503D44d78',
    systemContract: '0x40Eec3627A95c8fb969Bbf6769817cA3E021C289',
  },
  gatewayConfig: {
    baseUrl: 'https://api.stkr-goerli.ankr.com/',
  },
};
