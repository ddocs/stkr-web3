import BigNumber from 'bignumber.js';

export interface IVoterStats {
  claimableAnkrRewardOf: BigNumber;
}

export function mapVoterStats(data: IVoterStats): IVoterStats {
  return {
    claimableAnkrRewardOf: data.claimableAnkrRewardOf,
  };
}
