import { useQuery } from '@redux-requests/react';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BridgeActions,
  IDeposit,
  ISign,
} from '../../../store/actions/BridgeActions';
import { BridgeStorage } from '../utils/bridgeStorage';
import { useReset } from './useReset';

export const useProgress = () => {
  const dispatch = useDispatch();
  const bridgeState = BridgeStorage.get();
  const { dispatchResetQueries } = useReset();

  const signQuery = useQuery<ISign | null>({
    type: BridgeActions.sign.toString(),
  });

  const depositQuery = useQuery<IDeposit | null>({
    type: BridgeActions.deposit.toString(),
  });

  const txHash = depositQuery.data?.txHash || bridgeState.txHash;
  const signature = signQuery.data?.signature || bridgeState.signature;

  const onCloseClick = useCallback(() => {
    dispatchResetQueries();
    BridgeStorage.clear();
  }, [dispatchResetQueries]);

  const onSignClick = useCallback(() => {
    if (txHash) {
      dispatch(BridgeActions.sign(txHash));
    }
  }, [dispatch, txHash]);

  // todo: move to middleware or saga
  useEffect(() => {
    if (!signQuery.data) {
      return;
    }
    BridgeStorage.set({
      signature: signQuery.data.signature,
    });
  }, [signQuery.data]);

  return {
    signature,
    signLoading: signQuery.loading,
    signError: signQuery.error,
    onSignClick,
    onCloseClick,
  };
};
