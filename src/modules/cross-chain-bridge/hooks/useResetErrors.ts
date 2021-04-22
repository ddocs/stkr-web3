import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useEffect } from 'react';
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

export const useResetErrors = () => {
  const dispatch = useDispatch();

  const depositQuery = useQuery<IDeposit | null>({
    type: depositActionType,
  });

  const withdrawQuery = useQuery<IWithdraw | null>({
    type: withdrawActionType,
  });

  const signQuery = useQuery<ISign | null>({
    type: signActionType,
  });

  useEffect(() => {
    if (depositQuery.error) {
      setTimeout(() => {
        dispatch(resetRequests([depositActionType]));
      }, RESET_TIMEOUT);
    }
  }, [depositQuery.error, dispatch]);

  useEffect(() => {
    if (withdrawQuery.error) {
      setTimeout(() => {
        dispatch(resetRequests([withdrawActionType]));
      }, RESET_TIMEOUT);
    }
  }, [dispatch, withdrawQuery.error]);

  useEffect(() => {
    if (signQuery.error) {
      setTimeout(() => {
        dispatch(resetRequests([signActionType]));
      }, RESET_TIMEOUT);
    }
  }, [dispatch, signQuery.error]);
};
