import { useQuery } from '@redux-requests/react';
import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';
import { SlotAuctionActions } from '../actions/SlotAuctionActions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BigNumber from 'bignumber.js';

export const useSlotAuctionSdk = () => {
  const dispatch = useDispatch();

  const { data: slotAuctionSdk } = useQuery<SlotAuctionSdk>({
    type: SlotAuctionActions.initialize,
    autoLoad: true,
  });

  const {
    data: { isConnected, polkadotAccount, polkadotAccounts, networkType },
  } = useQuery({
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

  return {
    slotAuctionSdk,
    isConnected,
    polkadotAccount,
    polkadotAccounts,
    networkType,
  };
};

export const usePolkadotBalance = (): {
  balance: BigNumber;
  symbol: string;
} => {
  const {
    isConnected,
    slotAuctionSdk,
    networkType,
    polkadotAccount,
  } = useSlotAuctionSdk();
  const {
    data: { balance, symbol },
  } = useQuery({
    defaultData: {
      balance: new BigNumber('0'),
      symbol: networkType,
    },
    variables: [slotAuctionSdk, polkadotAccount],
    autoLoad: true,
    type: SlotAuctionActions.fetchPolkadotBalance,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isConnected) return;
    const timer = setInterval(() => {
      dispatch(
        SlotAuctionActions.fetchPolkadotBalance(
          slotAuctionSdk,
          polkadotAccount,
        ),
      );
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { balance, symbol };
};
