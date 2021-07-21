import {
  ICrowdloanType,
  SlotAuctionSdk,
  TCrowdloanStatus,
} from '@ankr.com/stakefi-polkadot';
import BigNumber from 'bignumber.js';
import { useQuery } from '@redux-requests/react';
import { SlotAuctionActions } from '../actions/SlotAuctionActions';
import { useSlotAuctionSdk } from './useSlotAuctionSdk';

export const useCrowdloansByStatus = (
  slotAuctionSdk: SlotAuctionSdk,
  crowdloanStatus: TCrowdloanStatus,
): {
  crowdloans: ICrowdloanType[];
} => {
  const {
    data: crowdloans,
  }: {
    data: ICrowdloanType[];
  } = useQuery({
    type: SlotAuctionActions.fetchCrowdloansByStatus,
    defaultData: [],
    variables: [slotAuctionSdk, crowdloanStatus],
    autoLoad: true,
  });
  return {
    crowdloans,
  };
};

export const useCrowdloanById = (
  crowdloanId: number,
): {
  crowdloan: ICrowdloanType;
  isLoading: boolean;
} => {
  const { slotAuctionSdk } = useSlotAuctionSdk();
  const { data } = useQuery({
    type: SlotAuctionActions.fetchCrowdloanById,
    defaultData: {
      crowdloan: null,
      isLoading: true,
    },
    variables: [slotAuctionSdk, crowdloanId],
    autoLoad: true,
  });
  return data;
};

export type BalancesType = Record<
  number,
  {
    total: BigNumber;
    claimable: BigNumber;
    onchain: BigNumber;
    claimableStakingRewards: BigNumber;
  }
>;

export const useCrowdloansWithBalances = (
  slotAuctionSdk: SlotAuctionSdk,
  crowdloanStatus: TCrowdloanStatus,
  polkadotAccount: string,
): {
  crowdloans: ICrowdloanType[];
  balances: BalancesType;
} => {
  const {
    data: crowdloans,
  }: {
    data: ICrowdloanType[];
  } = useQuery({
    type: SlotAuctionActions.fetchCrowdloansByStatus,
    defaultData: [],
    variables: [slotAuctionSdk, crowdloanStatus],
    autoLoad: true,
  });
  const {
    data: balances,
  }: {
    data: Record<
      number,
      {
        total: BigNumber;
        claimable: BigNumber;
        onchain: BigNumber;
        claimableStakingRewards: BigNumber;
      }
    >;
  } = useQuery({
    type: SlotAuctionActions.fetchCrowdloanBalances,
    defaultData: {},
    variables: [slotAuctionSdk, polkadotAccount],
    autoLoad: true,
  });
  return {
    crowdloans,
    balances,
  };
};
