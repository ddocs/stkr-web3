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
    stakingTokenSymbol: string;
  }
>;

export const useCrowdloans = (
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

export const useCrowdloanBalances = (
  slotAuctionSdk: SlotAuctionSdk,
  crowdloanStatus: TCrowdloanStatus,
  polkadotAccount: string,
): {
  balances: BalancesType;
} => {
  const {
    data: balances,
  }: {
    data: BalancesType;
  } = useQuery({
    type: SlotAuctionActions.fetchCrowdloanBalances,
    defaultData: {},
    variables: [slotAuctionSdk, polkadotAccount],
    autoLoad: true,
  });
  return {
    balances,
  };
};
