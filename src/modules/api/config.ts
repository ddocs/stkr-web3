import { IProviderConfig } from './provider';
import { IBinanceConfig, IContractConfig } from './contract';
import { IGatewayConfig } from './gateway';

export interface IStkrConfig {
  providerConfig: IProviderConfig;
  gatewayConfig: IGatewayConfig;
  contractConfig: IContractConfig;
  binanceConfig?: IBinanceConfig;
}

const LOCAL_CONFIG: IStkrConfig = {
  providerConfig: {
    ethereumChainId: 5,
    binanceChainId: 97,
  },
  contractConfig: {
    aethContract: '0x63dC5749fa134fF3B752813388a7215460a8aB01',
    microPoolContract: '0x5ea4C3a6CA22B38a1D6776329bb8b4073C157B27',
    microPoolBlock: '3775707',
    ankrContract: '0x7feD49F5B0497A060cdcfF50BdBD22E5d07661d8',
    stakingContract: '0xe48cDc6146722C045566c6B614263e22D9bF1b50',
    systemContract: '0xF2dFBCbE94Ff3A402B8575b80E5e785BC936c1c3',
  },
  binanceConfig: {
    globalPoolContract: '0x7027a219e6Fe1e2864E21857e31172D57B772838',
    globalPoolBlock: '5963975',
    pegEthContract: '0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378',
  },
  gatewayConfig: {
    baseUrl: 'http://localhost:8080/',
  },
};

const DEVELOP_CONFIG: IStkrConfig = {
  ...LOCAL_CONFIG,
  gatewayConfig: {
    baseUrl: 'https://api.dev.stkr.io/',
  },
};

const GOERLI_CONFIG: IStkrConfig = {
  ...LOCAL_CONFIG,
  gatewayConfig: {
    baseUrl: 'https://api.goerli.stkr.io/',
  },
};

const MAINNET_CONFIG: IStkrConfig = {
  providerConfig: {
    ethereumChainId: 1,
    binanceChainId: 56,
  },
  contractConfig: {
    aethContract: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
    microPoolContract: '0x84db6eE82b7Cf3b47E8F19270abdE5718B936670',
    microPoolBlock: '11225126',
    ankrContract: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
    stakingContract: '0x0000000000000000000000000000000000000000',
    systemContract: '0x3bFce37B5401BEF13C78830D3A9FB14294d18c4F',
  },
  binanceConfig: {
    globalPoolContract: '0x0000000000000000000000000000000000000000',
    globalPoolBlock: '0',
    pegEthContract: '0x0000000000000000000000000000000000000000',
  },
  gatewayConfig: {
    baseUrl: 'https://api.stkr.io/',
  },
};

export function configFromNetwork(networkName: string): IStkrConfig {
  if (networkName === 'mainnet') {
    return MAINNET_CONFIG;
  } else if (networkName === 'goerli') {
    return GOERLI_CONFIG;
  } else if (networkName === 'develop') {
    return DEVELOP_CONFIG;
  } else {
    return LOCAL_CONFIG;
  }
}

export function configFromEnv() {
  const env = process.env.REACT_APP_STKR_ENV
    ? process.env.REACT_APP_STKR_ENV
    : 'develop';
  console.log(`Current environment is: ${env}`);
  return configFromNetwork(env);
}
