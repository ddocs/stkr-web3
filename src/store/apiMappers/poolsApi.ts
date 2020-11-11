import BigNumber from 'bignumber.js';
import { MicroPoolReply, MicroPoolStatus } from '../../modules/api/gateway';
import { DEFAULT_STAKING_AMOUNT } from '../../common/const';
import { differenceInCalendarMonths } from 'date-fns';

export interface IMicropool {
  balance: BigNumber;
  beaconDeposit: string;
  blockHeight: number;
  created: Date;
  endTime?: Date;
  id: string;
  lastReward: BigNumber;
  lastSlashing: BigNumber;
  name: string;
  poolIndex: number;
  provider: string;
  publicKey: string;
  startTime?: Date;
  status: MicroPoolStatus;
  transactionHash: string;
  validator: string;
}

export function mapMicropool(item: MicroPoolReply) {
  return {
    balance: new BigNumber(
      item.status === 'MICRO_POOL_STATUS_ONGOING'
        ? DEFAULT_STAKING_AMOUNT.toString()
        : item.balance,
    ),
    beaconDeposit: item.beaconDeposit,
    blockHeight: item.blockHeight,
    created: new Date(item.created),
    endTime: item.endTime ? new Date(item.endTime * 1000) : undefined,
    id: item.id,
    lastReward: new BigNumber(item.lastReward),
    lastSlashing: new BigNumber(item.lastSlashing),
    name: item.name,
    poolIndex: item.poolIndex,
    provider: item.provider,
    publicKey: item.publicKey,
    startTime: item.startTime ? new Date(item.startTime * 1000) : undefined,
    status: item.status,
    transactionHash: item.transactionHash,
    validator: item.validator,
    period: differenceInCalendarMonths(item.startTime, item.endTime),
  };
}
