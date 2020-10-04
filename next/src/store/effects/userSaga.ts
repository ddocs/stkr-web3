/* eslint-disable @typescript-eslint/camelcase */
import { takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { UserActionTypes } from '../actions/UserActions';
import { delay } from 'redux-saga/effects';
import Web3 from "web3";

function* onSignIn(action: Action<null>) {
  if (window.web3) {
    // TODO update the deprecated call
    yield window.ethereum.enable();
    window.contracts = {};
    window.web3 = new Web3(window.web3.currentProvider);
    window.web3.eth.defaultAccount = window.ethereum.selectedAddress;
    window.web3.eth.personal.defaultAccount = window.ethereum.selectedAddress;
  } else {
    alert("Please install MetaMask to use this dApp!");
  }
  yield delay(1000);
}

export function* userSaga() {
  yield takeEvery(UserActionTypes.SIGN_IN, onSignIn);
}
