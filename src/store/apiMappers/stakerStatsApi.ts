import {
  StakerStats,
  UserStakeAction,
  UserStakeReply,
} from '../../modules/api/gateway';
import BigNumber from 'bignumber.js';

interface IStakeHistoryItem {
  user?: string;
  microPoolName?: string;
  amount: BigNumber;
  transactionHash: string;
  action: UserStakeAction;
}

export interface IStakerStats {
  reward: BigNumber;
  staked: BigNumber;
  aEthBalance: BigNumber;
  stakes: IStakeHistoryItem[];
}

function mapStakeHistoryItem(data: UserStakeReply): IStakeHistoryItem {
  return {
    user: data.user,
    microPoolName: 'no name',
    amount: new BigNumber(data.amount),
    transactionHash: data.transactionHash,
    action: data.action,
  };
}

export function mapStakerStats(
  data: StakerStats & { aEthBalance: string },
): IStakerStats {
  return {
    reward: new BigNumber(data.stats.totalRewards),
    staked: new BigNumber(data.stats.totalStakedAmount),
    aEthBalance: new BigNumber(data.aEthBalance),
    stakes: data.stakes.map(mapStakeHistoryItem).reverse(),
  };
}
