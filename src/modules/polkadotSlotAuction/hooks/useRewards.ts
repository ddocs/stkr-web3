import { useQuery } from '@redux-requests/react';
import { SlotAuctionActions } from '../actions/SlotAuctionActions';
import BigNumber from 'bignumber.js';
import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';

export const useRewards = (
  slotAuctionSdk: SlotAuctionSdk,
): {
  claimableStakingRewards: {
    loanId: number;
    amount: BigNumber;
  }[];
} => {
  const {
    data: { claimableStakingRewards },
  } = useQuery({
    type: SlotAuctionActions.fetchClaimableStakingRewards,
    defaultData: {},
  });

  return { claimableStakingRewards };
};
