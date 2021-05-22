import { IAvalancheConfig, IBinanceConfig, IContractConfig } from './contract';
import { IGatewayConfig } from './gateway';
import { IProviderConfig } from './provider';

export interface IStkrConfig {
  providerConfig: IProviderConfig;
  gatewayConfig: IGatewayConfig;
  contractConfig: IContractConfig;
  binanceConfig: IBinanceConfig;
  avalancheConfig: IAvalancheConfig;
}

const LOCAL_CONFIG: IStkrConfig = {
  providerConfig: {
    ethereumChainId: 5,
    binanceChainId: 97,
    avalancheChainId: 43113,
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
    futureBondAVAX: '0xEb52941a1eb73b23e2E22C09C71A9B2F1B4228b3',
  },
  binanceConfig: {
    globalPoolContract: '0xd61c4B16Cf2576F329e17eA73e63f11FACA81518',
    globalPoolBlock: '5963975',
    pegEthContract: '0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378',
    aethContract: '0x81f151c7104AC815e5F66bAAae91b0F85634Bb04',
    futureBondAVAX: '0xF235b88da053eBe821cd63f267a0a4914C95373E',
  },
  avalancheConfig: {
    globalPoolContract: '0x5B525ec8e1F6A64cDbfbd064753058d0b1D15C5C',
    futureBondAVAX: '0xb45A2749a3966992DC65fe8c22996E96C5c2BE3d',
    avalanchePool: '0x5B525ec8e1F6A64cDbfbd064753058d0b1D15C5C',
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
  ...{
    providerConfig: LOCAL_CONFIG.providerConfig,
  },
  ...{
    contractConfig: {
      ...LOCAL_CONFIG.contractConfig,
      ...{
        futureBondAVAX: '0xdb08E6fbFd8fF23BF8813968138e95304af1Ff13',
      },
    },
  },
  ...{
    binanceConfig: {
      ...LOCAL_CONFIG.binanceConfig,
      ...{
        futureBondAVAX: '0xdE733c7CcBBb3F5fF6Dfb6b24b4c65cA82e4DC50',
      },
    },
    avalancheConfig: {
      ...LOCAL_CONFIG.avalancheConfig,
      ...{
        futureBondAVAX: '0xBd97c29aa3E83C523C9714edCA8DB8881841a593',
        avalanchePool: '0x0C29D40cBD3c9073f4C0c96Bf88Ae1B4b4FE1d11',
        crossChainBridge: '0xC512F180454B5C1f2E53CD8B34d7Cd230564C963',
      },
    },
  },
  gatewayConfig: {
    baseUrl: 'https://api.goerli.stkr.io/',
  },
};

const MAINNET_CONFIG: IStkrConfig = {
  providerConfig: {
    ethereumChainId: 1,
    binanceChainId: 56,
    avalancheChainId: 43114,
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
    futureBondAVAX: '0x30176CECB6dbF0869D59493142925A0287B12216',
  },
  binanceConfig: {
    globalPoolContract: '0x3bFce37B5401BEF13C78830D3A9FB14294d18c4F',
    globalPoolBlock: '4939298',
    maxBlocksPerScan: 5000,
    pegEthContract: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    aethContract: '0x973616ff3b9d8F88411C5b4E6F928EE541e4d01f',
    futureBondAVAX: '0x76B44E392Ee9B12417de35c9f7dD927416C42688',
  },
  avalancheConfig: {
    globalPoolContract: '0x7BAa1E3bFe49db8361680785182B80BB420A836D',
    futureBondAVAX: '0x6C6f910A79639dcC94b4feEF59Ff507c2E843929',
    avalanchePool: '0x7BAa1E3bFe49db8361680785182B80BB420A836D',
  },
  gatewayConfig: {
    baseUrl: 'https://api.stkr.io/',
  },
};

export interface IRPCConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

export const BNB_RPC_CONFIG: IRPCConfig = {
  chainId: '0x61',
  chainName: 'Binance Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
  blockExplorerUrls: ['https://testnet.bscscan.com'],
};

export const ETH_RPC_CONFIG: IRPCConfig = {
  chainId: '0x5',
  chainName: 'Goerli Test Network',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.goerli.mudit.blog/'],
  blockExplorerUrls: [
    'https://goerli.etherscan.io/',
    'https://blockscout.com/eth/goerli ',
  ],
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
