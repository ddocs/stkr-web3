import { Providers } from '../../common/types';
import BigNumber from 'bignumber.js';

export interface IUserInfo {
  address: string;
  walletType: Providers;
  ethereumBalance: BigNumber;
  ankrBalance: BigNumber;
  aEthBalance: BigNumber;
  nativeBalance: BigNumber;
  bnbBalance?: BigNumber;
}
