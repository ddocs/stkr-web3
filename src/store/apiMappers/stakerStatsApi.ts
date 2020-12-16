import {
  StakerStats,
  UserStakeAction,
  UserStakeReply,
} from '../../modules/api/gateway';
import BigNumber from 'bignumber.js';

export interface IStakeHistoryItem {
  user?: string;
  microPoolName?: string;
  amount: BigNumber;
  transactionHash: string;
  action: UserStakeAction;
  isTopUp: boolean;
}

export interface IStakerStats {
  reward: BigNumber;
  staked: BigNumber;
  aEthClaimableBalance: BigNumber;
  aEthBalance: BigNumber;
  aEthRatio: BigNumber;
  stakes: IStakeHistoryItem[];
}

function mapStakeHistoryItem(data: UserStakeReply): IStakeHistoryItem {
  return {
    user: data.user,
    microPoolName: 'no name',
    amount: new BigNumber(data.amount),
    transactionHash: data.transactionHash,
    action: data.action,
    isTopUp: data.isTopUp,
  };
}

export function mapStakerStats(
  data: StakerStats & {
    aEthClaimableBalance: string;
    aEthBalance: string;
    aEthRatio: BigNumber;
  },
): IStakerStats {
  return {
    aEthClaimableBalance: new BigNumber(data.aEthClaimableBalance),
    reward: new BigNumber(data.stats.totalRewards),
    staked: new BigNumber(data.stats.totalStakedAmount),
    aEthBalance: new BigNumber(data.aEthBalance),
    aEthRatio: data.aEthRatio,
    stakes: data.stakes.map(mapStakeHistoryItem).reverse(),
  };
}
