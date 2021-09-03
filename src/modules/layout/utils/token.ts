import BigNumber from 'bignumber.js';

import { StkrSdk } from '../../api';
import { configFromEnv } from '../../api/config';
import IERC20 from '../../api/contract/IERC20.json';
import { Blockchain } from '../../../common/types';

const tokens = ['aETH', 'ETH', 'BNB', 'ANKR', 'AVAX'] as const;
export type tokenType = typeof tokens[number];

const getContractByToken = (token: tokenType, blockchainType: Blockchain) => {
  const stkrConfig = configFromEnv();

  switch (blockchainType) {
    case Blockchain.ethereum: {
      switch (token) {
        case 'aETH':
          return stkrConfig.contractConfig.aethContract ?? '';
        case 'ANKR':
          return stkrConfig.contractConfig.ankrContract ?? '';
        case 'AVAX':
          return stkrConfig.contractConfig.futureBondAVAX ?? '';
        default:
          return '';
      }
    }
    case Blockchain.binance: {
      switch (token) {
        case 'ETH':
          return stkrConfig.binanceConfig.pegEthContract;
        case 'aETH':
          return stkrConfig.binanceConfig.aethContract;
        case 'AVAX':
          return stkrConfig.binanceConfig.futureBondAVAX;
        default:
          return '';
      }
    }
    case Blockchain.avalanche: {
      // have only native AVAX
      return '';
    }
    default:
      return '';
  }
};

export const addTokenToWallet = async (token: IToken) => {
  if (!token.address) {
    return;
  }
  const stkrSdk = StkrSdk.getForEnv();
  const tokenContract = stkrSdk
    .getKeyProvider()
    .createContract(IERC20 as any, token.address);
  const decimals = await tokenContract.methods.decimals().call();

  await stkrSdk.getKeyProvider().addTokenToWallet({
    address: token.address,
    symbol: token.name,
    decimals,
  });
};

export const getMainTokenName = (blockchainType?: Blockchain): tokenType => {
  switch (blockchainType) {
    case Blockchain.avalanche:
      return 'AVAX';
    case Blockchain.binance:
      return 'BNB';
    case Blockchain.ethereum:
    default:
      return 'ETH';
  }
};

interface IToken {
  name: tokenType;
  balance?: BigNumber;
  address?: string;
}
export const getVisibleTokens = (
  tokens: IToken[],
  blockchainType?: Blockchain,
): IToken[] => {
  if (!blockchainType) {
    return [];
  }

  tokens.forEach(
    token => (token.address = getContractByToken(token.name, blockchainType)),
  );
  const mainTokenName = getMainTokenName(blockchainType);
  const mainToken = tokens.find(token => token.name === mainTokenName);
  if (!mainToken) {
    return [];
  }

  return [
    mainToken,
    ...tokens.filter(
      token => token.name !== mainTokenName && token.balance?.isGreaterThan(0),
    ),
  ];
};

export const getNetworkNameByToken = (blockchainType?: Blockchain) => {
  switch (blockchainType) {
    case Blockchain.avalanche:
      return 'Avalanche';
    case Blockchain.binance:
      return 'Binance';
    case Blockchain.ethereum:
      return 'Ethereum';
    default:
      return '';
  }
};
