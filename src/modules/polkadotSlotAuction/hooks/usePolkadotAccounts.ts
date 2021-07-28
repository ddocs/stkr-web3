import { useQuery } from '@redux-requests/react';
import { SlotAuctionActions } from '../actions/SlotAuctionActions';
import { useSlotAuctionSdk } from './useSlotAuctionSdk';

export const usePolkadotAccounts = (): { polkadotAccounts: string[] } => {
  const { slotAuctionSdk } = useSlotAuctionSdk();
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
