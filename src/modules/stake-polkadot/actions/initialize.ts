import { ISlotAuctionConfig } from '@ankr.com/stakefi-polkadot';
import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import { PolkadotProviderSingleton } from '../api/PolkadotProviderSingleton';

export const initialize = createAction<RequestAction, [ISlotAuctionConfig]>(
  'INITIALIZE_POLKADOT_PROVIDER',
  config => ({
    request: {
      promise: (async function () {
        return PolkadotProviderSingleton.createInstance(config);
      })(),
    },
    meta: {
      asMutation: false,
    },
  }),
);
