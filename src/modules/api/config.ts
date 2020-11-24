import { ProviderConfig } from './provider';
import { ContractConfig } from './contract';

export interface IStkrConfig {
  providerConfig: ProviderConfig;
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
    aethContract: '0x04b7208e732D46e75EF45155b946235a185423b2',
    microPoolContract: '0x0C06BEBd07E22ee5bfB0e5EC9bB22271faC86312',
    microPoolBlock: '3775707',
    ankrContract: '0x23f438234655Bf317af71088e135104A5532F937', // old
    stakingContract: '0xe48cDc6146722C045566c6B614263e22D9bF1b50', // old
    systemContract: '0x265B7726FF0Bb3b62D3F6bB9E88374f913FC4e22',
  },
  baseUrl: 'http://localhost:8080/',
  configUrl: 'https://cdn.stkr.io/contracts/develop/addresses.json',
};

export const DEVELOP_CONFIG: IStkrConfig = {
  ...LOCAL_CONFIG,
  baseUrl: 'https://api.stkr-dev.ankr.com/',
};

export const GOERLI_CONFIG: IStkrConfig = {
  ...LOCAL_CONFIG,
  contractConfig: {
    aethContract: '0x35F50849eEe33632cD948A165C75523Fd8E6B16B',
    microPoolContract: '0xDDEC45249efb72CbFe78f1Ad6DBf596DB6782CcD',
    microPoolBlock: '3777622',
    ankrContract: '0x23f438234655Bf317af71088e135104A5532F937', // old
    stakingContract: '0xe48cDc6146722C045566c6B614263e22D9bF1b50', // old
    systemContract: '0x19Ec552FB068D48de1A494C6655fc32bB00B2632',
  },
  baseUrl: 'https://api.stkr-goerli.ankr.com/',
};

export const MAINNET_CONFIG: IStkrConfig = {
  providerConfig: {
    networkId: '1',
    chainId: '1',
  },
  contractConfig: {
    aethContract: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
    microPoolContract: '0x84db6eE82b7Cf3b47E8F19270abdE5718B936670',
    microPoolBlock: '11225126',
    ankrContract: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
    stakingContract: '0x0000000000000000000000000000000000000000',
    systemContract: '0x3bFce37B5401BEF13C78830D3A9FB14294d18c4F',
  },
  baseUrl: 'https://api.stkr.ankr.com/',
  configUrl: 'https://cdn.stkr.io/contracts/mainnet/addresses.json',
};
