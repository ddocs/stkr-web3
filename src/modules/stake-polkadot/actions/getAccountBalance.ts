import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { PolkadotProviderSingleton } from '../api/PolkadotProviderSingleton';

export interface IAccountBalanceReply {
  reserved: BigNumber;
  miscFrozen: BigNumber;
  free: BigNumber;
  feeFrozen: BigNumber;
  nonce: BigNumber;
}

export const getAccountBalance = createSmartAction<
  RequestAction<any, IAccountBalanceReply>,
  [string]
>('POLKADOT_BALANCE', address => ({
  request: {
    promise: (async () => {
      const polkadotProviderInstance = PolkadotProviderSingleton.getInstance();
      return await polkadotProviderInstance.getAccountBalance(address);
    })(),
  },
  meta: {
    asMutation: false,
  },
}));
