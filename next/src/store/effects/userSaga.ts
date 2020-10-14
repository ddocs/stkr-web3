import { put, takeEvery, select } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { UserActions, UserActionTypes } from '../actions/UserActions';
import { createErrorAction } from '../../common/utils/createErrorAction';
import { createSuccessAction } from '../../common/utils/createSuccessAction';
import { StkrSdk } from '../../modules/api';
import { IStoreState } from '../reducers';
import { isAuthenticated } from '../reducers/userReducer';
import { closeModalAction } from '../modals/actions';
import { REHYDRATE } from 'redux-persist/es/constants';

function* onSignIn(action: Action<null>) {
  try {
    // const stkrSdk = StkrSdk.getLastInstance();
    // yield stkrSdk?.connectMetaMask();

    yield put(createSuccessAction(UserActionTypes.SIGN_IN));
    yield put(UserActions.fetchUserInfo());
    yield put(closeModalAction());
  } catch (error) {
    yield put(createErrorAction(UserActionTypes.SIGN_IN, error));
  }
}

function* init() {
  const { isAuth } = yield select((store: IStoreState) => ({
    isAuth: isAuthenticated(store.user),
  }));

  if (isAuth) {
    yield put(UserActions.signIn());
  }
}

export function* userSaga() {
  yield takeEvery(UserActionTypes.SIGN_IN, onSignIn);
  yield takeEvery(REHYDRATE, init);
}
