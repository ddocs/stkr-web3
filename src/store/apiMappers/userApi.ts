import { Blockchain, Provider } from '../../common/types';
import BigNumber from 'bignumber.js';

export interface IUserInfo {
  address: string;
  blockchainType: Blockchain;
  walletType: Provider;
  ethereumBalance: BigNumber;
  ankrBalance: BigNumber;
  aEthBalance: BigNumber;
  nativeBalance: BigNumber;
  bnbBalance?: BigNumber;
}
