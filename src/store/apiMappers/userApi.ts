import { Blockchains, Providers } from '../../common/types';
import BigNumber from 'bignumber.js';

export interface IUserInfo {
  address: string;
  blockchainType: Blockchains;
  walletType: Providers;
  ethereumBalance: BigNumber;
  ankrBalance: BigNumber;
  aEthBalance: BigNumber;
  nativeBalance: BigNumber;
  bnbBalance?: BigNumber;
}
