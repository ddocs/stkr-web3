import { IBinanceConfig, IContractConfig } from './contract';
import { IGatewayConfig } from './gateway';
import { IProviderConfig } from './provider';

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
    fethContract: '0xe64FCf6327bB016955EFd36e75a852085270c374',
    microPoolContract: '0x5ea4C3a6CA22B38a1D6776329bb8b4073C157B27',
    microPoolBlock: '3775707',
    ankrContract: '0x7feD49F5B0497A060cdcfF50BdBD22E5d07661d8',
    stakingContract: '0xB0a2AF91d74Fe7F60E7c147E3217e78d38784556',
    systemContract: '0xF2dFBCbE94Ff3A402B8575b80E5e785BC936c1c3',
    globalPoolDepositContract: '0x07b39F4fDE4A38bACe212b546dAc87C58DfE3fDC',
    governanceAddress: '0xB0a2AF91d74Fe7F60E7c147E3217e78d38784556',
  },
  binanceConfig: {
    globalPoolContract: '0xd61c4B16Cf2576F329e17eA73e63f11FACA81518',
    globalPoolBlock: '5963975',
    pegEthContract: '0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378',
    aethContract: '0x81f151c7104AC815e5F66bAAae91b0F85634Bb04',
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
    fethContract: '0xD01ef7C0A5d8c432fc2d1a85c66cF2327362E5C6',
    microPoolContract: '0x84db6eE82b7Cf3b47E8F19270abdE5718B936670',
    microPoolBlock: '11225126',
    ankrContract: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
    stakingContract: '0xC12EbCEdC914b3f52022cDa98C92e3B95E109daE',
    systemContract: '0x3bFce37B5401BEF13C78830D3A9FB14294d18c4F',
    globalPoolDepositContract: '0x00000000219ab540356cBB839Cbe05303d7705Fa',
    governanceAddress: '0xC12EbCEdC914b3f52022cDa98C92e3B95E109daE',
  },
  binanceConfig: {
    globalPoolContract: '0x3bFce37B5401BEF13C78830D3A9FB14294d18c4F',
    globalPoolBlock: '4939298',
    maxBlocksPerScan: 5000,
    pegEthContract: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    aethContract: '0x973616ff3b9d8F88411C5b4E6F928EE541e4d01f',
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
