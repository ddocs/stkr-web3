import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Blockchain } from '../../../common/types';
import { BridgeActions, IDeposit } from '../../../store/actions/BridgeActions';
import { IBridgeFormValues } from '../components/BridgeForm';
import { BridgeStorage } from '../utils/bridgeStorage';
import { useAccountData } from './useAccountData';

export const useBridge = () => {
  const dispatch = useDispatch();
  const { accountData } = useAccountData();
  const {
    amount,
    toAddress,
    fromBlockchain: initialFromBlockchain,
    toBlockchain: initialToBlockchain,
  } = BridgeStorage.get();
  const [fromBlockchain, setFromBlockchain] = useState(
    initialFromBlockchain || Blockchain.ethereum,
  );
  const [toBlockchain, setToBlockchain] = useState(
    initialToBlockchain || Blockchain.binance,
  );

  const depositQuery = useQuery<IDeposit | null>({
    type: BridgeActions.deposit.toString(),
  });

  const onSwapClick = useCallback(() => {
    setFromBlockchain(toBlockchain);
    setToBlockchain(fromBlockchain);
  }, [fromBlockchain, toBlockchain]);

  const onSubmit = useCallback(
    ({ address, amount }: IBridgeFormValues) => {
      if (!accountData) {
        return;
      }
      dispatch(
        BridgeActions.deposit({
          fromAddress: accountData.address,
          toAddress: address,
          amount: new BigNumber(amount),
          fromBlockchain,
          toBlockchain,
        }),
      );
    },
    [accountData, dispatch, fromBlockchain, toBlockchain],
  );

  // todo: move to middleware or saga.
  // It is also necessary to explore the possibility of using
  // persistence or redux-requests cache.
  useEffect(() => {
    if (!depositQuery.data) {
      return;
    }
    // Set data to localStorage for cases when the page is reloaded
    BridgeStorage.set({
      fromAddress: depositQuery.data.fromAddress,
      toAddress: depositQuery.data.toAddress,
      amount: depositQuery.data.amount.toString(),
      fromBlockchain: depositQuery.data.fromBlockchain,
      toBlockchain: depositQuery.data.toBlockchain,
      txHash: depositQuery.data.txHash,
    });
  }, [depositQuery.data]);

  return {
    accountData,
    onSubmit,
    onSwapClick,
    fromBlockchain,
    toBlockchain,
    amount: depositQuery.data?.amount || amount,
    toAddress: depositQuery.data?.toAddress || toAddress,
    depositLoading: depositQuery.loading,
    depositError: depositQuery.error,
    assetType: 'aETHc',
  };
};
