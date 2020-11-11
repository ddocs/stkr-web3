import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import {
  INotificationProps,
  INotificationState,
} from '../../store/reducers/notificationReducer';
import { Snackbar } from '@material-ui/core';
import { uid } from 'react-uid';
import { Alert } from '@material-ui/lab';
import { NotificationActions } from '../../store/actions/NotificationActions';

interface IItemProps {
  data: INotificationProps;
  onClose: (key?: any) => void;
}

function Item({ data, onClose }: IItemProps) {
  const handleClose = useCallback(() => {
    onClose(data.key);
  }, [data.key, onClose]);

  return (
    <Snackbar open={true} {...data}>
      <Alert severity={data.severity} onClose={handleClose}>
        {data.message}
      </Alert>
    </Snackbar>
  );
}

interface INotifications {
  notifications: INotificationProps[];
  hideNotification: typeof NotificationActions.hideNotification;
}

const NotificationsComponent = ({
  notifications,
  hideNotification,
}: INotifications) => {
  const handleClose = (id: string) => {
    hideNotification(id);
  };

  return (
    <>
      {notifications.map(item => (
        <Item key={uid(item)} data={item} onClose={handleClose} />
      ))}
    </>
  );
};

export const Notifications = connect(
  (state: { notification: INotificationState }) => ({
    notifications: state.notification.queue,
  }),
  {
    hideNotification: NotificationActions.hideNotification,
  },
)(NotificationsComponent);
