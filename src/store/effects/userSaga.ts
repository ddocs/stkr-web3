import { put, takeEvery, select } from 'redux-saga/effects';
import { UserActions, UserActionTypes } from '../actions/UserActions';
import { createErrorAction } from '../../common/utils/createErrorAction';
import { createSuccessAction } from '../../common/utils/createSuccessAction';
import { StkrSdk } from '../../modules/api';
import { closeModalAction } from '../modals/actions';
import { REHYDRATE } from 'redux-persist/es/constants';
import { replace } from 'connected-react-router';
import { INDEX_PATH, PICKER_PATH } from '../../common/const';
import { resetRequests } from '@redux-requests/core';
import { IStoreState } from '../reducers';

function* onConnect() {
  try {
    const stkrSdk = StkrSdk.getLastInstance();
    yield stkrSdk?.connectMetaMask();

    yield put(createSuccessAction(UserActionTypes.CONNECT));
    yield put(UserActions.fetchAccountData());
    yield put(closeModalAction());
    yield put(replace(PICKER_PATH));
  } catch (error) {
    yield put(createErrorAction(UserActionTypes.CONNECT, error));
  }
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
  yield takeEvery(UserActionTypes.CONNECT, onConnect);
  yield takeEvery(UserActionTypes.DISCONNECT_SUCCESS, onDisconnectSuccess);
  yield takeEvery(REHYDRATE, init);
}
