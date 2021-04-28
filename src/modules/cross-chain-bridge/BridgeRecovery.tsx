import { Box } from '@material-ui/core';
import React from 'react';
import { useConnect } from '../../common/hooks/useConnect';
import { t } from '../../common/utils/intl';
import { Curtains } from '../../UiKit/Curtains';
import { BigButton } from './components/BigButton';
import { Bridge as BridgeComponent } from './components/Bridge';
import { BridgeForm } from './components/BridgeForm';
import { NotificationText } from './components/NotificationText';
import { blockchainsMap } from './const';
import { useBridgeRecovery } from './hooks/useBridgeRecovery';

export const BridgeRecovery = () => {
  const { dispatchConnect, isAuth, dispatchDisconnect } = useConnect();
  const {
    onSubmit,
    onSwapClick,
    onCloseClick,
    fromBlockchain,
    toBlockchain,
    accountData,
  } = useBridgeRecovery();

  const isSenderBlockchainOk = accountData
    ? accountData.blockchainType === fromBlockchain
    : false;

  const renderedDisconnect = (
    <Box textAlign="center">
      <NotificationText>
        {t('cross-chain-bridge.switch-network', {
          blockchain: blockchainsMap[fromBlockchain].title,
        })}
      </NotificationText>

      <BigButton onClick={dispatchDisconnect}>
        {t('cross-chain-bridge.disconnect-btn')}
      </BigButton>
    </Box>
  );

  const renderedForm = (
    <BridgeForm
      onSubmit={onSubmit}
      balanceType="aETH"
      additionalText={t('cross-chain-bridge.recovery.info')}
    />
  );

  return (
    <Box component="section" py={{ xs: 5, sm: 10 }}>
      <Curtains>
        <BridgeComponent
          title={t('cross-chain-bridge.recovery.title')}
          fromBlockchain={fromBlockchain}
          toBlockchain={toBlockchain}
          onSwapClick={onSwapClick}
          onConnectClick={dispatchConnect}
          isConnected={isAuth}
          form={isSenderBlockchainOk ? renderedForm : renderedDisconnect}
          onCloseClick={onCloseClick}
        />
      </Curtains>
    </Box>
  );
};
