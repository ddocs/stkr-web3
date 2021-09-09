import BigNumber from 'bignumber.js';
import { useQuery } from '@redux-requests/react';
import { SlotAuctionActions } from '../actions/SlotAuctionActions';
import { useSlotAuctionSdk } from './useSlotAuctionSdk';

export const usePolkadotBalance = (): {
  balance: BigNumber;
  symbol: string;
} => {
  const { networkType } = useSlotAuctionSdk();
  const {
    data: { balance, symbol },
  } = useQuery({
    defaultData: {
      balance: new BigNumber('0'),
      symbol: networkType,
    },
    type: SlotAuctionActions.fetchPolkadotBalance,
  });

  return { balance, symbol };
};
