import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { BRIDGE_PATH } from '../../../common/const';
import { Blockchain } from '../../../common/types';
import { IBridgeFormValues } from '../components/BridgeForm';
import { BridgeStorage } from '../utils/bridgeStorage';
import { useAccountData } from './useAccountData';

export const useBridgeRecovery = () => {
  const [fromBlockchain, setFromBlockchain] = useState(Blockchain.ethereum);
  const [toBlockchain, setToBlockchain] = useState(Blockchain.binance);
  const { accountData } = useAccountData();
  const history = useHistory();

  const onSwapClick = useCallback(() => {
    setFromBlockchain(toBlockchain);
    setToBlockchain(fromBlockchain);
  }, [fromBlockchain, toBlockchain]);

  const onCloseClick = useCallback(() => {
    history.push(BRIDGE_PATH);
  }, [history]);

  const onSubmit = useCallback(
    ({ address, amount, txHash }: IBridgeFormValues) => {
      if (!accountData) {
        return;
      }
      BridgeStorage.set({
        fromAddress: accountData.address,
        toAddress: address,
        amount: `${amount}`,
        fromBlockchain,
        toBlockchain,
        txHash,
      });
      onCloseClick();
    },
    [accountData, fromBlockchain, onCloseClick, toBlockchain],
  );

  return {
    onSubmit,
    onSwapClick,
    onCloseClick,
    fromBlockchain,
    toBlockchain,
    accountData,
  };
};
