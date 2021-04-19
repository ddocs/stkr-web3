import { getQuery, resetRequests, success } from '@redux-requests/core';
import { replace } from 'connected-react-router';
import { END, eventChannel } from 'redux-saga';
import {
  call,
  cancel,
  cancelled,
  fork,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { INDEX_PATH } from '../../common/const';
import { pushEvent } from '../../common/utils/pushEvent';
import { StkrSdk } from '../../modules/api';
import {
  ContractManagerEvent,
  ContractManagerEvents,
  KeyProviderEvent,
  KeyProviderEvents,
} from '../../modules/api/event';
import { UserActions, UserActionTypes } from '../actions/UserActions';
import { IConnectResponse } from '../apiMappers/connectApi';
import { IUserInfo } from '../apiMappers/userApi';
import { IApplicationStore } from '../createStore';

function createEventChannel() {
  return eventChannel(emitter => {
    const events = StkrSdk.getForEnv().getEventEmitter();

    [
      ...Object.values(KeyProviderEvents),
      ...Object.values(ContractManagerEvents),
    ].forEach(value => {
      events.on(value, data => {
        emitter({ data, type: value });
      });
    });

    events.on(KeyProviderEvents.Disconnect, () => {
      emitter(END);
    });

    return () => {
      events.removeAllListeners();
    };
  });
}

function* listenKeyProviderEvents() {
  const channel = yield call(createEventChannel);

  try {
    while (true) {
      const event: KeyProviderEvent & ContractManagerEvent = yield take(
        channel,
      );

      if (event.type === KeyProviderEvents.ChainChanged) {
        yield put(UserActions.disconnect());
        setTimeout(() => {
          window.location.reload();
        });
      } else if (event.type === KeyProviderEvents.AccountChanged) {
        const address =
          event.data.accounts.length > 0 ? event.data.accounts[0] : undefined;

        const { currentAddress } = yield select((store: IApplicationStore) => {
          const currentAddress = getQuery<IUserInfo | undefined>(store, {
            type: UserActionTypes.FETCH_ACCOUNT_DATA,
          }).data?.address;
          return { currentAddress };
        });

        if (currentAddress.toLowerCase() !== address?.toLowerCase()) {
          yield put(UserActions.disconnect());
          setTimeout(() => {
            window.location.reload();
          });
        }
      } else if (event.type === KeyProviderEvents.Disconnect) {
        yield put(UserActions.disconnect());
        setTimeout(() => {
          window.location.reload();
        });
      } else if (event.type === ContractManagerEvents.AnkrBalanceChanged) {
        yield put(
          UserActions.updateAccountData({
            ankrBalance: event.data.balance,
          }),
        );
      } else if (event.type === ContractManagerEvents.EthereumBalanceChanged) {
        yield put(
          UserActions.updateAccountData({
            ethereumBalance: event.data.balance,
          }),
        );
      } else if (event.type === ContractManagerEvents.AethBalanceChanged) {
        // TODO test it
        yield put(
          UserActions.updateStakerStats({
            claimableAETHRewardOf: event.data.balance,
          }),
        );
      } else if (event.type === ContractManagerEvents.StakePending) {
        yield put(
          UserActions.updateStakerStats({
            stakes: [
              {
                transactionHash: event.data.eventLog.transactionHash,
                amount: event.data.amount,
                action: 'STAKE_ACTION_PENDING',
              },
            ],
          }),
        );
      } else if (event.type === ContractManagerEvents.StakeConfirmed) {
        yield put(
          UserActions.updateStakerStats({
            stakes: [
              {
                transactionHash: event.data.eventLog.transactionHash,
                amount: event.data.amount,
                action: 'STAKE_ACTION_CONFIRMED',
              },
            ],
          }),
        );
      } else if (event.type === ContractManagerEvents.AnkrDepositAllowed) {
        yield put(UserActions.fetchAllowance());
      } else if (event.type === ContractManagerEvents.AnkrDepositSuccessful) {
        yield put(UserActions.fetchProviderStats());
        yield put(UserActions.fetchingStakingHistory());
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

function* onConnectSuccess(action: {
  type: string;
  response: { data: IConnectResponse };
}) {
  pushEvent('login', { method: 'web3' });
  const listenKeyProviderEventsTask = yield fork(listenKeyProviderEvents);
  yield take([UserActionTypes.DISCONNECT, UserActionTypes.CONNECT]);
  yield cancel(listenKeyProviderEventsTask);
}

function* onDisconnectSuccess() {
  yield put(resetRequests());
  yield put(replace(INDEX_PATH));
  try {
    // TODO Can be excess
    const stkrSdk = StkrSdk.getForEnv();
    yield stkrSdk?.disconnect();
  } catch (error) {
    console.error(error);
  }
}

export function* userSaga() {
  yield takeEvery(success(UserActionTypes.CONNECT), onConnectSuccess);
  yield takeEvery(success(UserActionTypes.DISCONNECT), onDisconnectSuccess);
}
