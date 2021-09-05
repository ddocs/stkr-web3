import { TNetworkType } from '@ankr.com/stakefi-polkadot';
import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { IStoreState } from '../../../store/reducers';
import { PolkadotProviderSingleton } from '../api/PolkadotProviderSingleton';
import { getAccountBalance } from './getAccountBalance';
import { getDepositAddress } from './getDepositAddress';

export interface IPolkadotConnected {
  isConnected: boolean;
  networkType: TNetworkType;
  currentPolkadotAccount: string;
  polkadotAccounts: string[];
}

export const connect = createAction<
  RequestAction<any, IPolkadotConnected>,
  [string?]
>('CONNECT_POLKADOT_PROVIDER', selectedPolkadotAccount => ({
  request: {
    promise: (async (): Promise<IPolkadotConnected> => {
      const polkadotProviderInstance = PolkadotProviderSingleton.getInstance();

      if (!polkadotProviderInstance.isConnected()) {
        await polkadotProviderInstance.connect();
      }

      const polkadotAccounts = await polkadotProviderInstance.getAccounts();
      const selectedAccountIndex = polkadotAccounts.indexOf(
        selectedPolkadotAccount ?? '',
      );
      const currentPolkadotAccount =
        polkadotAccounts[
          selectedAccountIndex === -1 ? 0 : selectedAccountIndex
        ];

      const networkType = await polkadotProviderInstance.getNetworkType();

      return {
        isConnected: polkadotProviderInstance.isConnected(),
        networkType,
        currentPolkadotAccount,
        polkadotAccounts,
      };
    })(),
  },
  meta: {
    asMutation: false,
    onSuccess: (
      response: { data: IPolkadotConnected },
      _action: RequestAction<any, any>,
      store: Store<IStoreState> & {
        dispatchRequest: DispatchRequest;
      },
    ) => {
      store.dispatchRequest(
        getAccountBalance(response.data.currentPolkadotAccount),
      );
      store.dispatchRequest(getDepositAddress(response.data.networkType));

      return response;
    },
  },
}));
