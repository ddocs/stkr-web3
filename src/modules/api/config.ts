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
    microPoolContract: '0x605B652E2E824D40eFc556073a940E9E0a635Ccc',
    ankrContract: '0xb8Ca76ad70BA333a6E748CB2e11529FB681607Bc',
    stakingContract: '0x496a9BABf517DD43787888a6a036cAaa31dAe3Ef',
    systemContract: '0x971fd574D320020B8715fFc260268048321dD29B',
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
    microPoolContract: '0xb89501803ECA443395e812a2809C1E983571f2Bb',
    ankrContract: '0xFbA94aC31054a00000a9a87A10E45C7e980FFC62',
    stakingContract: '0x4a62eB9556cE8f5aa5391C701Dee45506ac5E18b',
    systemContract: '0x45D3fAb725aa73308D52990BcB66106542004aEe',
  },
  gatewayConfig: {
    baseUrl: 'https://api.stkr-goerli.ankr.com/',
  },
};
