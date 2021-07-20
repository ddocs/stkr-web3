import {
  ICrowdloanType,
  SlotAuctionSdk,
  TCrowdloanStatus,
} from '@ankr.com/stakefi-polkadot';
import BigNumber from 'bignumber.js';
import { useQuery } from '@redux-requests/react';
import { SlotAuctionActions } from '../actions/SlotAuctionActions';

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
