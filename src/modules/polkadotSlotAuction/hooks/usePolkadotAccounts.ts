import { useQuery } from '@redux-requests/react';
import { SlotAuctionActions } from '../actions/SlotAuctionActions';

export const usePolkadotAccounts = (): { polkadotAccounts: string[] } => {
  const {
    data: { polkadotAccounts },
  } = useQuery({
    defaultData: { polkadotAccounts: [] },
    type: SlotAuctionActions.fetchPolkadotAccounts,
  });

  return { polkadotAccounts };
};
