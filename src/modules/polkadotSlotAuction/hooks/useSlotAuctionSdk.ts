import { useQuery } from '@redux-requests/react';
import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';
import { SlotAuctionActions } from '../actions/SlotAuctionActions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useSlotAuctionSdk = () => {
  const dispatch = useDispatch();

  const { data: slotAuctionSdk } = useQuery<SlotAuctionSdk>({
    type: SlotAuctionActions.initialize,
    autoLoad: true,
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
    type: SlotAuctionActions.connect,
  });

  useEffect(() => {
    if (!isConnected) return;
    const timer = setInterval(() => {
      dispatch(
        SlotAuctionActions.fetchCrowdloanBalances(
          slotAuctionSdk,
          polkadotAccount,
        ),
      );
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { slotAuctionSdk, isConnected, polkadotAccount };
};
