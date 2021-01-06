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
    networkId: 5,
    chainId: 5,
  },
  contractConfig: {
    aethContract: '0x63dc5749fa134ff3b752813388a7215460a8ab01',
    microPoolContract: '0x5f2935be5F981E706C757BC2e74E29bE7DC6d114',
    microPoolBlock: '3775707',
    ankrContract: '0xe195fe8fd7ed84fe6d5a3bd24d5586a31d299c8c',
    stakingContract: '0xe48cDc6146722C045566c6B614263e22D9bF1b50', // old
    systemContract: '0xF2dFBCbE94Ff3A402B8575b80E5e785BC936c1c3',
  },
  baseUrl: 'http://localhost:8080/',
  configUrl: 'https://cdn.stkr.io/contracts/develop/addresses.json',
};

export const DEVELOP_CONFIG: IStkrConfig = {
  ...LOCAL_CONFIG,
  baseUrl: 'https://api.dev.stkr.io/',
  configUrl: 'https://cdn.stkr.io/contracts/goerli/addresses.json',
};

export const GOERLI_CONFIG: IStkrConfig = {
  ...LOCAL_CONFIG,
  baseUrl: 'https://api.goerli.stkr.io/',
  configUrl: 'https://cdn.stkr.io/contracts/goerli/addresses.json',
};

export const MAINNET_CONFIG: IStkrConfig = {
  providerConfig: {
    networkId: 1,
    chainId: 1,
  },
  contractConfig: {
    aethContract: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
    microPoolContract: '0x84db6eE82b7Cf3b47E8F19270abdE5718B936670',
    microPoolBlock: '11225126',
    ankrContract: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
    stakingContract: '0x0000000000000000000000000000000000000000',
    systemContract: '0x3bFce37B5401BEF13C78830D3A9FB14294d18c4F',
  },
  baseUrl: 'https://api.stkr.io/',
  configUrl: 'https://cdn.stkr.io/contracts/mainnet/addresses.json',
};
