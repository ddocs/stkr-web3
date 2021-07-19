import { useQuery } from '@redux-requests/react';
import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';
import { SlotAuctionActions } from '../actions/SlotAuctionActions';

export const useSlotAuctionSdk = () => {
  const { data: slotAuctionSdk } = useQuery<SlotAuctionSdk>({
    type: SlotAuctionActions.initialize.toString(),
  });

  const {
    data: { isConnected, polkadotAccount },
  } = useQuery<{
    isConnected: boolean;
    polkadotAccount: string;
  }>({
    defaultData: {
      isConnected: false,
    },
    type: SlotAuctionActions.connect.toString(),
  });

  return { slotAuctionSdk, isConnected, polkadotAccount };
};