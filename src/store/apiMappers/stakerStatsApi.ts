import { StakerStats, UserStakeAction, UserStakeReply, } from '../../modules/api/gateway';
import BigNumber from 'bignumber.js';

interface IStakeHistoryItem {
  user: string;
  microPoolName: string;
  amount: BigNumber;
  transactionHash: string;
  action: UserStakeAction;
  date: Date;
}

export interface IStakerStats {
  reward: BigNumber;
  staked: BigNumber;
  stakes: IStakeHistoryItem[];
}

function mapStakeHistoryItem(data: UserStakeReply): IStakeHistoryItem {
  return {
    user: data.user,
    microPoolName: data.microPool,
    amount: new BigNumber(data.amount),
    transactionHash: data.transactionHash,
    action: data.action,
    date: new Date(data.timestamp),
  };
}

export function mapStakerStats(data: StakerStats): IStakerStats {
  return {
    reward: new BigNumber(data.stats.totalRewards),
    staked: new BigNumber(data.stats.totalStakedAmount),
    stakes: data.stakes.map(mapStakeHistoryItem),
  };
}
