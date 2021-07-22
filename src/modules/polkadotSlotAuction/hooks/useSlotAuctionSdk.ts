import { useQuery } from '@redux-requests/react';
import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';
import { SlotAuctionActions } from '../actions/SlotAuctionActions';

export const useSlotAuctionSdk = () => {
  const { data: slotAuctionSdk } = useQuery<SlotAuctionSdk>({
    type: SlotAuctionActions.initialize,
    autoLoad: true,
  });

  const {
    data: { isConnected, polkadotAccount, networkType },
  } = useQuery({
    defaultData: {
      isConnected: false,
    },
    type: SlotAuctionActions.connect,
  });

  return {
    slotAuctionSdk,
    isConnected,
    polkadotAccount,
    networkType,
  };
};
