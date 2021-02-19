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
  aEthBalance: BigNumber;
  aEthRatio: BigNumber;
  fEthBalance: BigNumber;
  pendingStake: BigNumber;
  stakes: IStakeHistoryItem[];
  claimableAETHRewardOf: BigNumber;
  claimableAETHFRewardOf: BigNumber;
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
    aEthBalance: BigNumber; // was string, now using JSSDK
    fEthBalance: BigNumber;
    aEthRatio: BigNumber;
    pendingStake: BigNumber;
    claimableAETHRewardOf: BigNumber;
    claimableAETHFRewardOf: BigNumber;
  },
): IStakerStats {
  return {
    stakes: data.stakes.map(mapStakeHistoryItem).reverse(),
    aEthBalance: data.aEthBalance,
    aEthRatio: data.aEthRatio,
    pendingStake: data.pendingStake,
    claimableAETHRewardOf: data.claimableAETHRewardOf,
    claimableAETHFRewardOf: data.claimableAETHFRewardOf,
    fEthBalance: data.fEthBalance,
  };
}
