import * as React from 'react';
import { ErrorProps } from '@redux-requests/react';
import { t } from '../../common/utils/intl';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationActions } from '../../store/actions/NotificationActions';

export function getErrorMessage(props: ErrorProps) {
  if (typeof props.error?.response?.data?.message === 'string') {
    return props.error.response.data.message;
  }

  if (typeof props.error.message === 'string') {
    return props.error.message;
  }

  if (props.error.toString) {
    return props.error.toString();
  }

  return t('error.unknown');
}

interface ILoadingProps extends ErrorProps {}

export const QueryError = (props: ILoadingProps) => {
  const message = getErrorMessage(props);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      dispatch(
        NotificationActions.showNotification({
          message,
          severity: 'error',
        }),
      );
    }
  }, [dispatch, message]);

  return <div>{message}</div>;
};
