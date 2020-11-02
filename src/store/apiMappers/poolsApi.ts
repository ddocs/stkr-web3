import BigNumber from 'bignumber.js';
import { MicroPoolStatus } from '../../modules/api/gateway';

export interface IPool {
  name: string;
  provider: string;
  period: number;
  fee: BigNumber;
  lastReward: BigNumber;
  lastSlashing: BigNumber;
  startTime: Date;
  endTime: Date;
  currentStake: BigNumber;
  totalStake: BigNumber;
  status: MicroPoolStatus;
  poolIndex: number;
  transactionHash: string;
  blockHeight: number;
  beaconDeposit: string;
}
