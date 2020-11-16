import { ProviderConfig } from './provider';
import { ContractConfig } from './contract';

export interface IStkrConfig {
  providerConfig?: ProviderConfig;
  contractConfig?: ContractConfig;
  baseUrl: string;
  configUrl: string;
}

export const LOCAL_CONFIG: IStkrConfig = {
  providerConfig: {
    networkId: '5',
    chainId: '5',
  },
  contractConfig: {
    aethContract: '0x2C6c8d1dcc90C6cd66e9508F22BbeA40BdcaFb9c',
    microPoolContract: '0x96286E3BED3638541D5a6e5134C50C4d2C21d8D1',
    ankrContract: '0x23f438234655Bf317af71088e135104A5532F937',
    stakingContract: '0xe48cDc6146722C045566c6B614263e22D9bF1b50',
    systemContract: '0x9C3bAd0a6755d07C9784adD9c42F58c6256a01A6',
  },
  baseUrl: 'http://localhost:8080/',
  configUrl: 'https://assets.stkr.io/contracts/test/addresses.json',
};

export const DEVELOP_CONFIG: IStkrConfig = {
  ...LOCAL_CONFIG,
  baseUrl: 'https://api.stkr-dev.ankr.com/',
  configUrl: 'https://assets.stkr.io/contracts/test/addresses.json',
};

export const GOERLI_CONFIG: IStkrConfig = {
  ...LOCAL_CONFIG,
  baseUrl: 'https://api.stkr-goerli.ankr.com/',
  configUrl: 'https://assets.stkr.io/contracts/test/addresses.json',
};

export const MAINNET_CONFIG: IStkrConfig = {
  providerConfig: {
    networkId: '1',
    chainId: '1',
  },
  contractConfig: {
    aethContract: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
    microPoolContract: '0x84db6eE82b7Cf3b47E8F19270abdE5718B936670',
    ankrContract: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
    stakingContract: '0x0000000000000000000000000000000000000000',
    systemContract: '0x3bFce37B5401BEF13C78830D3A9FB14294d18c4F',
  },
  baseUrl: 'https://api.stkr.ankr.com/',
  configUrl: 'https://assets.stkr.io/contracts/mainnet/addresses.json',
};
