import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from '../../../store/reducers';
import { PolkadotProviderSingleton } from '../api/PolkadotProviderSingleton';
import { connect, IPolkadotConnected } from './connect';
import { getAccountBalance } from './getAccountBalance';
import { getDepositAddress } from './getDepositAddress';
import { IPolkadotDepositReply, makeDeposit } from './makeDeposit';

/**
 * User sends some DOT/KSM to our deposit address using polkadot{.js} extension
 * [Docs](https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction)
 */
export const sendToDeposit = createSmartAction<
  RequestAction<any, IPolkadotDepositReply | null>,
  [BigNumber]
>('POLKADOT_SEND_TO_DEPOSIT', amount => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: true,
    onRequest: (
      _request: any,
      _action: RequestAction,
      store: Store<IStoreState> & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async (): Promise<IPolkadotDepositReply | null> => {
          const polkadotProvider = PolkadotProviderSingleton.getInstance();
          const state = store.getState();

          const { data: connectData } = getQuery<IPolkadotConnected>(state, {
            type: connect,
          });

          const { data: depositAddress } = getQuery<string | null>(state, {
            type: getDepositAddress.toString(),
          });

          if (!depositAddress) {
            return null;
          }

          const { extId } = await polkadotProvider.sendFundsWithExtrinsic(
            connectData.currentPolkadotAccount,
            depositAddress,
            amount,
          );

          const { data } = await store.dispatchRequest(
            makeDeposit({
              network: connectData.networkType,
              extrinsicId: extId,
            }),
          );

          return data ?? null;
        })(),
      };
    },
    onSuccess: (
      response: { data: IPolkadotDepositReply | null },
      _action: RequestAction<any, any>,
      store: Store<IStoreState> & {
        dispatchRequest: DispatchRequest;
      },
    ) => {
      const { data: connectData } = getQuery<IPolkadotConnected>(
        store.getState(),
        { type: connect },
      );

      store.dispatchRequest(
        getAccountBalance(connectData.currentPolkadotAccount),
      );

      return response;
    },
  },
}));
