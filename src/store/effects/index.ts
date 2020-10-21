import { fork } from 'redux-saga/effects';
import { userSaga } from './userSaga';

function* rootSaga() {
  yield fork(userSaga);
}

export { rootSaga };
