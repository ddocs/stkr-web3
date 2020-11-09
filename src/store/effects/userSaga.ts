import {
  call,
  cancel,
  cancelled,
  delay,
  fork,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { UserActions, UserActionTypes } from '../actions/UserActions';
import { REHYDRATE } from 'redux-persist/es/constants';
import { replace } from 'connected-react-router';
import { INDEX_PATH } from '../../common/const';
import { getQuery, resetRequests, success } from '@redux-requests/core';
import { IStoreState } from '../reducers';
import { END, eventChannel } from 'redux-saga';
import { StkrSdk } from '../../modules/api';
import {
  KeyProviderEvent,
  KeyProviderEvents,
} from '../../modules/api/provider';
import { IApplicationStore } from '../createStore';
import { IUserInfo } from '../apiMappers/userApi';

const FETCH_ACCOUNT_DATA_DELAY = 15000;

function createEventChannel() {
  return eventChannel(emitter => {
    const events = StkrSdk.getLastInstance().getKeyProvider().events;

    events.on(KeyProviderEvents.AccountChanged, data => {
      emitter({ data, type: KeyProviderEvents.AccountChanged });
    });

    events.on(KeyProviderEvents.Disconnect, () => {
      emitter(END);
    });

    events.on(KeyProviderEvents.Message, data => {
      emitter({ data, type: KeyProviderEvents.Message });
    });

    events.on(KeyProviderEvents.ChainChanged, data => {
      emitter({ data, type: KeyProviderEvents.ChainChanged });
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
      const event: KeyProviderEvent = yield take(channel);

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
      } else if (event.type === KeyProviderEvents.Message) {
        console.log(event);
      } else if (event.type === KeyProviderEvents.Disconnect) {
        yield put(UserActions.disconnect());
        setTimeout(() => {
          window.location.reload();
        });
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

function* accountDataSync() {
  while (true) {
    yield put(UserActions.fetchAccountData());
    yield delay(FETCH_ACCOUNT_DATA_DELAY);
  }
}

function* onConnectSuccess() {
  const accountDataSyncTask = yield fork(accountDataSync);

  const listenKeyProviderEventsTask = yield fork(listenKeyProviderEvents);

  yield take([UserActionTypes.DISCONNECT, UserActionTypes.CONNECT]);

  yield cancel(accountDataSyncTask);
  yield cancel(listenKeyProviderEventsTask);
}

function* onDisconnectSuccess() {
  yield put(resetRequests());
  yield put(replace(INDEX_PATH));
}

function* init() {
  const { isConnectionAvailable } = yield select((store: IStoreState) => ({
    isConnectionAvailable: store.user.isConnectionAvailable,
  }));

  if (isConnectionAvailable) {
    yield put(UserActions.connect());
  }
}

export function* userSaga() {
  yield takeEvery(success(UserActionTypes.CONNECT), onConnectSuccess);
  yield takeEvery(success(UserActionTypes.DISCONNECT), onDisconnectSuccess);
  yield takeEvery(REHYDRATE, init);
}
