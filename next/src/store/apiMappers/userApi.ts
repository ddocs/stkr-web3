import { Providers } from '../../common/types';

export interface IUserInfo {
  address: string;
  walletType: Providers;
  ethereumBalance: number;
  ankrBalance: number;
}
