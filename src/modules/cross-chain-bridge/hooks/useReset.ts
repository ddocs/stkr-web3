import { resetRequests } from '@redux-requests/core';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { BridgeActions } from '../../../store/actions/BridgeActions';

export const useReset = () => {
  const dispatch = useDispatch();
  const dispatchResetQueries = useCallback(() => {
    const actions = [
      BridgeActions.deposit.toString(),
      BridgeActions.sign.toString(),
      BridgeActions.withdraw.toString(),
    ];
    dispatch(resetRequests(actions));
  }, [dispatch]);

  return { dispatchResetQueries };
};
