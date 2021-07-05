import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Address } from '../../api/provider';
import { web3FromAddress } from '@polkadot/extension-dapp';

interface Response {
  address: Address;
}

export const connectPolkadotAction = createSmartAction<
  RequestAction<Response, Response>
>('connectPolkadot', (address: string) => ({
  request: {
    promise: Promise.resolve(),
  },
  meta: {
    getData: data => data,
    onRequest: () => {
      return {
        promise: (async () => {
          const provider = await web3FromAddress(address);
          console.log('provider', provider);

          return {
            address,
          };
        })(),
      };
    },
  },
}));
