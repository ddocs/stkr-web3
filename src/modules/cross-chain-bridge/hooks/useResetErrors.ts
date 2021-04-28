import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Seconds } from '../../../common/types';
import {
  BridgeActions,
  IDeposit,
  ISign,
  IWithdraw,
} from '../../../store/actions/BridgeActions';

const RESET_TIMEOUT: Seconds = 5 * 1000;
const depositActionType = BridgeActions.deposit.toString();
const withdrawActionType = BridgeActions.withdraw.toString();
const signActionType = BridgeActions.sign.toString();

/**
 * Reset error messages after RESET_TIMEOUT seconds
 */
export const useResetErrors = () => {
  const dispatch = useDispatch();
  const [resetTimeout, setResetTimeout] = useState<NodeJS.Timeout>();

  const depositQuery = useQuery<IDeposit | null>({
    type: depositActionType,
  });

  const withdrawQuery = useQuery<IWithdraw | null>({
    type: withdrawActionType,
  });

  const signQuery = useQuery<ISign | null>({
    type: signActionType,
  });

  // cancel the reset action if any request starts again during
  // the reset timeout
  useEffect(() => {
    const isPending =
      depositQuery.pending || withdrawQuery.pending || signQuery.pending;

    if (isPending && resetTimeout) {
      clearTimeout(resetTimeout);
    }
  }, [
    depositQuery.pending,
    resetTimeout,
    signQuery.pending,
    withdrawQuery.pending,
  ]);

  useEffect(() => {
    if (depositQuery.error) {
      const timeout = setTimeout(() => {
        dispatch(resetRequests([depositActionType]));
      }, RESET_TIMEOUT);
      setResetTimeout(timeout);
    }
  }, [depositQuery.error, dispatch]);

  useEffect(() => {
    if (withdrawQuery.error) {
      const timeout = setTimeout(() => {
        dispatch(resetRequests([withdrawActionType]));
      }, RESET_TIMEOUT);
      setResetTimeout(timeout);
    }
  }, [dispatch, withdrawQuery.error]);

  useEffect(() => {
    if (signQuery.error) {
      const timeout = setTimeout(() => {
        dispatch(resetRequests([signActionType]));
      }, RESET_TIMEOUT);
      setResetTimeout(timeout);
    }
  }, [dispatch, signQuery.error]);
};
