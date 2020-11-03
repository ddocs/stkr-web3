import {
  cancel,
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
import { resetRequests, success } from '@redux-requests/core';
import { IStoreState } from '../reducers';

const FETCH_ACCOUNT_DATA_DELAY = 15000;

function* accountDataSync() {
  while (true) {
    yield put(UserActions.fetchAccountData());
    yield delay(FETCH_ACCOUNT_DATA_DELAY);
  }
}

function* onConnectSuccess() {
  const accountDataSyncTask = yield fork(accountDataSync);

  yield take([UserActionTypes.DISCONNECT, UserActionTypes.CONNECT]);

  yield cancel(accountDataSyncTask);
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
