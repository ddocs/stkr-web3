import BigNumber from 'bignumber.js';
import { useQuery } from '@redux-requests/react';
import { SlotAuctionActions } from '../actions/SlotAuctionActions';
import { useSlotAuctionSdk } from './useSlotAuctionSdk';

export const usePolkadotBalance = (): {
  balance: BigNumber;
  symbol: string;
} => {
  const { slotAuctionSdk, networkType, polkadotAccount } = useSlotAuctionSdk();
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

  return { balance, symbol };
};
