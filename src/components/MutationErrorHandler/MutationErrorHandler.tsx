import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationActions } from '../../store/actions/NotificationActions';
import { getErrorMessage } from '../QueryError/QueryError';
import { useMutation } from '@redux-requests/react';
import { resetRequests } from '@redux-requests/core';

interface IMutationErrorHandlerProps {
  type: string;
}

export const MutationErrorHandler = ({ type }: IMutationErrorHandlerProps) => {
  const { error } = useMutation({ type });
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      if (error) {
        dispatch(resetRequests([type]));
      }
    },
    [dispatch, error, type],
  );

  useEffect(() => {
    if (error) {
      const message = getErrorMessage({ error });
      dispatch(
        NotificationActions.showNotification({
          message,
          severity: 'error',
        }),
      );
    }
  }, [dispatch, error]);

  return <></>;
};
