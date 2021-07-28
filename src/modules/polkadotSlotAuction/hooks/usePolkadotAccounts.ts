import { useQuery } from '@redux-requests/react';
import { SlotAuctionActions } from '../actions/SlotAuctionActions';
import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';

export const usePolkadotAccounts = (
  slotAuctionSdk: SlotAuctionSdk,
): { polkadotAccounts: string[] } => {
  const {
    data: { polkadotAccounts },
  } = useQuery({
    defaultData: { polkadotAccounts: [] },
    variables: [slotAuctionSdk],
    autoLoad: true,
    type: SlotAuctionActions.fetchPolkadotAccounts,
  });

  return { polkadotAccounts };
};
