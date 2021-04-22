import { useQuery } from '@redux-requests/react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BridgeActions,
  IDeposit,
  ISign,
  IWithdraw,
} from '../../../store/actions/BridgeActions';
import { UserActions } from '../../../store/actions/UserActions';
import { BridgeStorage } from '../utils/bridgeStorage';
import { useReset } from './useReset';

export const useWithdraw = () => {
  const dispatch = useDispatch();
  const { dispatchResetQueries } = useReset();
  const [done, setDone] = useState(false);
  const bridgeState = BridgeStorage.get();

  const signQuery = useQuery<ISign | null>({
    type: BridgeActions.sign.toString(),
  });

  const depositQuery = useQuery<IDeposit | null>({
    type: BridgeActions.deposit.toString(),
  });

  const withdrawQuery = useQuery<IWithdraw | null>({
    type: BridgeActions.withdraw.toString(),
  });

  const txHash = depositQuery.data?.txHash || bridgeState.txHash;
  const signature = signQuery.data?.signature || bridgeState.signature;
  const fromAddress = depositQuery.data?.fromAddress || bridgeState.fromAddress;
  const amount = depositQuery.data?.amount || bridgeState.amount;
  const toBlockchain =
    depositQuery.data?.toBlockchain || bridgeState.toBlockchain;

  const onClaimClick = useCallback(() => {
    if (signature && txHash && fromAddress && amount && toBlockchain) {
      dispatch(
        BridgeActions.withdraw({
          txHash,
          signature,
          fromAddress,
          amount: amount.toString(),
          to: toBlockchain,
        }),
      );
    }
  }, [fromAddress, amount, dispatch, signature, toBlockchain, txHash]);

  const onRepeatClick = useCallback(() => {
    setDone(false);
  }, []);

  const onCloseClick = useCallback(() => {
    setDone(false);
    dispatchResetQueries();
    BridgeStorage.clear();
  }, [dispatchResetQueries]);

  useEffect(() => {
    const claimed = !!withdrawQuery.data?.resultTx;
    if (claimed) {
      setDone(true);
      dispatchResetQueries();
      BridgeStorage.clear();
      dispatch(UserActions.fetchStakerStats());
    }
  }, [dispatch, dispatchResetQueries, withdrawQuery.data]);

  return {
    withdrawLoading: withdrawQuery.loading,
    withdrawError: withdrawQuery.error,
    done,
    onClaimClick,
    onRepeatClick,
    onCloseClick,
  };
};
