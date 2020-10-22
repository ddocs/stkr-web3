import BigNumber from 'bignumber.js';
import { MicroPoolStatus } from '../../modules/api/gateway';

export interface IPool {
  name: string;
  provider: string;
  period: number;
  fee: BigNumber;
  currentStake: BigNumber;
  totalStake: BigNumber;
  status: MicroPoolStatus;
}
