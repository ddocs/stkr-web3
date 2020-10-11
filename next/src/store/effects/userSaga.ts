import { put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { UserActions, UserActionTypes } from '../actions/UserActions';
import Web3 from 'web3';
import { createErrorAction } from '../../common/utils/createErrorAction';
import { createSuccessAction } from '../../common/utils/createSuccessAction';

function* onSignIn(action: Action<null>) {
  try {
    if (window.web3) {
      // TODO update the deprecated call https://docs.metamask.io/guide/ethereum-provider.html#legacy-methods
      yield window.ethereum.enable();
      window.contracts = {};
      window.web3 = new Web3(window.web3.currentProvider);
      window.web3.eth.defaultAccount = window.ethereum.selectedAddress;
      window.web3.eth.personal.defaultAccount = window.ethereum.selectedAddress;
    } else {
      alert('Please install MetaMask to use this dApp');
    }

    yield put(createSuccessAction(UserActionTypes.SIGN_IN));
    yield put(UserActions.fetchUserInfo());
  } catch (error) {
    yield put(createErrorAction(UserActionTypes.SIGN_IN, error));
  }
}

export function* userSaga() {
  yield takeEvery(UserActionTypes.SIGN_IN, onSignIn);
}
