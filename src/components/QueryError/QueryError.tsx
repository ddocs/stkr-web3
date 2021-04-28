import { Box, BoxProps } from '@material-ui/core';
import { ErrorProps } from '@redux-requests/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '../../common/utils/intl';
import { NotificationActions } from '../../store/actions/NotificationActions';

export function getErrorMessage(props: ErrorProps) {
  if (typeof props.error?.error === 'string') {
    return props.error.error;
  }

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

interface ILoadingProps extends ErrorProps, BoxProps {}

export const QueryError = ({ error, ...boxProps }: ILoadingProps) => {
  const message = getErrorMessage({ error });
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

  return <Box {...boxProps}>{message}</Box>;
};
