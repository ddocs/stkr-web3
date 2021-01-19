import { fork } from 'redux-saga/effects';
import { userSaga } from './userSaga';
import { notificationSaga } from './notificationSaga';
import { governanceSaga } from '../../modules/governance/effects/governanceSaga';

function* rootSaga() {
  yield fork(userSaga);
  yield fork(notificationSaga);
  yield fork(governanceSaga);
}

export { rootSaga };
