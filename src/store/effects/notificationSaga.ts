import { END, eventChannel } from 'redux-saga';
import { put, race, take, takeEvery } from 'redux-saga/effects';
import {
  NotificationActions,
  NotificationActionsTypes,
} from '../actions/NotificationActions';
import { INotificationProps } from '../reducers/notificationReducer';
import { Action } from 'redux-actions';

function* showNotification(action: Action<INotificationProps>) {
  const payload = action.payload;

  const channel = eventChannel(emitter => {
    const onClose = () => {
      emitter(true);
      emitter(END);
    };
    setImmediate(() => emitter(onClose));
    return () => null;
  });

  const handleClose = yield take(channel);

  const notification: INotificationProps = {
    ...payload,
    onClose: handleClose,
  };

  yield put(NotificationActions.pushNotificationToTheQueue(notification));

  try {
    yield race([
      take(channel),
      take(
        (filterAction: any) =>
          filterAction.type === NotificationActionsTypes.HIDE_NOTIFICATION &&
          notification.key === filterAction.payload,
      ),
    ]);
  } finally {
    yield put(NotificationActions.hideNotification(notification.key));
  }
}

export function* notificationSaga() {
  yield takeEvery(NotificationActionsTypes.SHOW_NOTIFICATION, showNotification);
}
