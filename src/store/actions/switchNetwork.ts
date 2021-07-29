import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { BlockchainNetworkId } from '../../common/types';
import { StkrSdk } from '../../modules/api';

export const switchNetwork = createSmartAction<
  RequestAction,
  [BlockchainNetworkId]
>('SWITCH_NETWORK', chainId => ({
  request: {
    promise: (async function () {
      const stkrSdk = StkrSdk.getForEnv();
      return stkrSdk.switchNetwork(chainId);
    })(),
  },
}));
