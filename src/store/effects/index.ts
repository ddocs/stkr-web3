import { fork } from 'redux-saga/effects';
import { userSaga } from './userSaga';
import { notificationSaga } from './notificationSaga';

function* rootSaga() {
  yield fork(userSaga);
  yield fork(notificationSaga);
}

export { rootSaga };
