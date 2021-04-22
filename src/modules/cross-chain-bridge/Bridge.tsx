import { Box } from '@material-ui/core';
import React from 'react';
import { BRIDGE_RECOVERY_PATH } from '../../common/const';
import { useConnect } from '../../common/hooks/useConnect';
import { t } from '../../common/utils/intl';
import { QueryError } from '../../components/QueryError/QueryError';
import { Curtains } from '../../UiKit/Curtains';
import { Available } from './components/Available';
import { BigButton } from './components/BigButton';
import { Bridge as BridgeComponent } from './components/Bridge';
import { BridgeForm } from './components/BridgeForm';
import { NotificationText } from './components/NotificationText';
import { Progress } from './components/Progress';
import { blockchainsMap } from './const';
import { useBridge } from './hooks/useBridge';
import { useProgress } from './hooks/useProgress';
import { useResetErrors } from './hooks/useResetErrors';
import { useStakerStats } from './hooks/useStakerStats';
import { useWithdraw } from './hooks/useWithdraw';
import { getCustomErrorMessage } from './utils/getCustomErrorMessage';

export const Bridge = () => {
  useResetErrors();
  const { stakerStats, stakerStatsLoading } = useStakerStats();
  const { dispatchConnect, isAuth, dispatchDisconnect } = useConnect();
  const {
    accountData,
    toAddress,
    amount,
    assetType,
    depositError,
    depositLoading,
    fromBlockchain,
    onSubmit,
    onSwapClick,
    toBlockchain,
  } = useBridge();

  const {
    onSignClick,
    signLoading,
    signError,
    signature,
    onCloseClick: onProgressClose,
  } = useProgress();

  const {
    done,
    onClaimClick,
    withdrawError,
    withdrawLoading,
    onRepeatClick,
    onCloseClick: onWithdrawClose,
  } = useWithdraw();

  const isTxnInProgress = !!amount;

  const isSenderBlockchainOk = accountData
    ? accountData.blockchainType === fromBlockchain
    : false;

  const isRecipientBlockchainOk = accountData
    ? accountData.blockchainType === toBlockchain
    : false;

  const isRecipientAddressOk = accountData
    ? accountData.address.toLowerCase() === toAddress?.toLowerCase()
    : false;

  const isSigned = !!signature;

  const renderedForm = (
    <BridgeForm
      onSubmit={onSubmit}
      balance={stakerStats ? stakerStats.aEthBalance : undefined}
      submitDisabled={depositLoading}
      isLoading={depositLoading}
      balanceType={assetType}
      isBalanceLoading={!stakerStats || stakerStatsLoading}
      additionalText={
        <>
          {depositError && <QueryError error={depositError} />}
          {depositLoading && t('cross-chain-bridge.waiting-hash')}
        </>
      }
    />
  );

  const renderedDisconnectBtn = (
    <BigButton onClick={dispatchDisconnect}>
      {t('cross-chain-bridge.disconnect-btn')}
    </BigButton>
  );

  const renderedDisconnect = (
    <Box textAlign="center">
      <NotificationText>
        {t('cross-chain-bridge.switch-network', {
          blockchain: blockchainsMap[fromBlockchain].title,
        })}
      </NotificationText>

      {renderedDisconnectBtn}
    </Box>
  );

  const renderedBridge = (
    <BridgeComponent
      fromBlockchain={fromBlockchain}
      toBlockchain={toBlockchain}
      onSwapClick={onSwapClick}
      onConnectClick={dispatchConnect}
      isConnected={isAuth}
      form={isSenderBlockchainOk ? renderedForm : renderedDisconnect}
      disabled={depositLoading}
      recoveryLink={BRIDGE_RECOVERY_PATH}
    />
  );

  const renderedProgress = amount && toAddress && (
    <Progress
      amount={amount.toString()}
      amountType={assetType}
      address={toAddress}
      isCompleted={isSigned}
      fromBlockchain={fromBlockchain}
      toBlockchain={toBlockchain}
      onCloseClick={onProgressClose}
    >
      <Box textAlign="center" mt={5}>
        {!!signError && (
          <NotificationText>
            {getCustomErrorMessage(signError)}
          </NotificationText>
        )}

        {isAuth && !isSigned && isSenderBlockchainOk && (
          <BigButton
            onClick={onSignClick}
            isLoading={signLoading}
            disabled={signLoading}
          >
            {t('cross-chain-bridge.progress.sign')}
          </BigButton>
        )}

        {isAuth && !isSigned && !isSenderBlockchainOk && !stakerStatsLoading && (
          <>
            <NotificationText>
              {t('cross-chain-bridge.switch-network', {
                blockchain: blockchainsMap[fromBlockchain].title,
              })}
            </NotificationText>

            {renderedDisconnectBtn}
          </>
        )}

        {isSigned && (
          <>
            {(!isRecipientBlockchainOk || !isRecipientAddressOk) && (
              <NotificationText>
                {t('cross-chain-bridge.progress.signed-wrong-wallet', {
                  blockchain: blockchainsMap[toBlockchain].title,
                })}
              </NotificationText>
            )}

            {isAuth &&
              (!isRecipientBlockchainOk || !isRecipientAddressOk) &&
              renderedDisconnectBtn}
          </>
        )}

        {!isAuth && (
          <BigButton onClick={dispatchConnect}>
            {t('cross-chain-bridge.connect-btn')}
          </BigButton>
        )}
      </Box>
    </Progress>
  );

  const renderedResults = (
    <Box mb={{ xs: 7, sm: 10 }}>
      <Available
        value={(amount || 0).toString()}
        network={blockchainsMap[toBlockchain].title}
        onClaimClick={onClaimClick}
        isLoading={withdrawLoading}
        done={done}
        onRepeatClick={onRepeatClick}
        onCloseClick={onWithdrawClose}
      />

      {withdrawError && <QueryError display="none" error={withdrawError} />}
    </Box>
  );

  const showResults =
    (isSigned && isAuth && isRecipientBlockchainOk && isRecipientAddressOk) ||
    done;
  const showProgress = !showResults && (isTxnInProgress || isSigned);
  const showBridge = !showProgress && !showResults;

  return (
    <Box component="section" py={{ xs: 5, sm: 10 }}>
      <Curtains>
        {showBridge && renderedBridge}
        {showProgress && renderedProgress}
        {showResults && renderedResults}
      </Curtains>
    </Box>
  );
};
