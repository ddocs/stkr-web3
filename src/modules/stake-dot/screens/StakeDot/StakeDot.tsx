import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { StakeDotAlert } from '../../components/StakeDotAlert';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { Dashboard } from '../../components/Dashboard';

const needAlert = false;

export const StakeDot = () => {
  const dispatch = useDispatch();

  useInitEffect(() => {
    dispatch(AvalancheActions.checkWallet());
  });

  const renderAlert = useCallback(() => <StakeDotAlert />, []);

  if (needAlert) {
    // TODO: check connection and requiredNetwork
    return renderAlert();
  }

  return <Dashboard isConnected />;
};
