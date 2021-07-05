import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { fetchPolkadotWallets } from '../utils/fetchPolkadotWallets';
import { Address } from '../../api/provider';

export interface IAccount {
  name: string;
  address: Address;
}

interface IResponse {
  accounts: IAccount[];
}

export const fetchPolkadotWalletsAction = createSmartAction<
  RequestAction<IResponse, IResponse>
>('fetchPolkadotWallets', () => ({
  request: {
    promise: (async function () {
      return {
        accounts: (await fetchPolkadotWallets()).map(item => ({
          name: item.meta.name,
          address: item.address,
        })),
      };
    })(),
  },
  meta: {
    getData: data => data,
  },
}));
