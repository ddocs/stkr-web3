import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationActions } from '../../store/actions/NotificationActions';
import { getErrorMessage } from '../QueryError/QueryError';
import { useMutation } from '@redux-requests/react';
import { resetRequests } from '@redux-requests/core';

interface IMutationErrorHandlerProps {
  type: string;
  /*
   * @deprecated Deprecate it since leads to wrong request status
   */
  resetOnShow?: boolean;
  filter?: (error: any) => boolean;
}

export const MutationErrorHandler = ({
  type,
  resetOnShow = true,
  filter,
}: IMutationErrorHandlerProps) => {
  const { error } = useMutation({ type });
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      if (resetOnShow && error) {
        dispatch(resetRequests([type]));
      }
    },
    [dispatch, error, resetOnShow, type],
  );

  useEffect(() => {
    if (error) {
      const message = getErrorMessage({ error });
      if (filter ? !filter(message) : true) {
        dispatch(
          NotificationActions.showNotification({
            message,
            severity: 'error',
          }),
        );
      }
    }
  }, [dispatch, error, filter]);

  return <></>;
};
