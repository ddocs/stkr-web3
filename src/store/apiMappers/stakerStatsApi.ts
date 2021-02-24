import { UserStakeAction, IUserStakeReply } from '../../modules/api/gateway';
import BigNumber from 'bignumber.js';

export interface IStakerStats {
  aEthBalance: BigNumber;
  aEthRatio: BigNumber;
  fEthBalance: BigNumber;
  pendingStake: BigNumber;
  claimableAETHRewardOf: BigNumber;
  claimableFETHRewardOf: BigNumber;
}

export interface IStakeHistoryItem {
  user?: string;
  microPoolName?: string;
  amount: BigNumber;
  transactionHash: string;
  action: UserStakeAction;
  isTopUp: boolean;
}

export interface IStakingHistory {
  stakes: IStakeHistoryItem[];
}

export function mapStakeHistoryItem(data: IUserStakeReply): IStakeHistoryItem {
  return {
    user: data.user,
    microPoolName: 'no name',
    amount: new BigNumber(data.amount),
    transactionHash: data.transactionHash,
    action: data.action,
    isTopUp: data.isTopUp,
  };
}

export function mapStakerStats(data: {
  aEthBalance: BigNumber;
  fEthBalance: BigNumber;
  aEthRatio: BigNumber;
  pendingStake: BigNumber;
  claimableAETHRewardOf: BigNumber;
  claimableFETHRewardOf: BigNumber;
}): IStakerStats {
  return {
    aEthBalance: data.aEthBalance,
    aEthRatio: data.aEthRatio,
    pendingStake: data.pendingStake,
    claimableAETHRewardOf: data.claimableAETHRewardOf,
    claimableFETHRewardOf: data.claimableFETHRewardOf,
    fEthBalance: data.fEthBalance,
  };
}
