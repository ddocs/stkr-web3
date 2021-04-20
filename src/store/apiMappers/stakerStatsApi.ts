import { UserStakeAction, IUserStakeReply } from '../../modules/api/gateway';
import BigNumber from 'bignumber.js';
import { DepositType } from '../../common/types';

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
  type: DepositType;
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
    type: data.type,
  };
}

export function isAllowedTransaction(data: IStakeHistoryItem) {
  return !(
    data.transactionHash ===
      '0xfa2ebcfedf98ea1b3f1252ba06d57a6c0164e0b6fdc4647f8d2172aebbad482b' &&
    data.user === '0x2d25e050fCf2551a9e78bDcF6d6FD0483d3f5211'
  );
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
