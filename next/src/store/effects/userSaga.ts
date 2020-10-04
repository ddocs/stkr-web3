/* eslint-disable @typescript-eslint/camelcase */
import { takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { UserActionTypes } from '../actions/UserActions';
import { delay } from 'redux-saga/effects';

function* onSignIn(action: Action<null>) {
  console.log('onSignIn');
  yield delay(1000);
}

export function* userSaga() {
  yield takeEvery(UserActionTypes.SIGN_IN, onSignIn);
}
