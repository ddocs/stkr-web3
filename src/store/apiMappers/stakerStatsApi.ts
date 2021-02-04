import {
  IStakerStats as StakerStats,
  UserStakeAction,
  IUserStakeReply,
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
  aEthClaimableBalance: BigNumber;
  aEthBalance: BigNumber;
  aEthRatio: BigNumber;
  pendingStake: BigNumber;
  stakes: IStakeHistoryItem[];
}

function mapStakeHistoryItem(data: IUserStakeReply): IStakeHistoryItem {
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
    pendingStake: BigNumber;
  },
): IStakerStats {
  return {
    stakes: data.stakes.map(mapStakeHistoryItem).reverse(),
    aEthClaimableBalance: new BigNumber(data.aEthClaimableBalance),
    aEthBalance: new BigNumber(data.aEthBalance),
    aEthRatio: data.aEthRatio,
    pendingStake: data.pendingStake,
  };
}
