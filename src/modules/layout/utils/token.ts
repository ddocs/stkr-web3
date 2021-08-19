import { StkrSdk } from '../../api';
import { configFromEnv } from '../../api/config';
import IERC20 from '../../api/contract/IERC20.json';

const tokens = ['aETH', 'ETH', 'BNB', 'ANKR', 'AVAX'] as const;
export type tokenType = typeof tokens[number];

const getContractByToken = (token: tokenType) => {
  const stkrConfig = configFromEnv();

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
};

export const addTokenToMetamask = async (token: tokenType) => {
  if (['ETH', 'BNB'].includes(token)) {
    return;
  }
  const stkrSdk = StkrSdk.getForEnv();
  const tokenAddress = getContractByToken(token);
  const tokenContract = stkrSdk
    .getKeyProvider()
    .createContract(IERC20 as any, tokenAddress);
  const decimals = await tokenContract.methods.decimals().call();

  await stkrSdk.getKeyProvider().addTokenToWallet({
    address: tokenAddress,
    symbol: token,
    decimals,
  });
};
