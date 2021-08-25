import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { StakeDotAlert } from '../../components/StakeDotAlert';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { Dashboard } from '../../components/Dashboard';
import { AvalancheActions } from '../../../stake-avax/actions/AvalancheActions';

const needAlert = false;

export const StakeDot = () => {
  const dispatch = useDispatch();

  useInitEffect(() => {
    dispatch(AvalancheActions.fetchTransactionStatus());
  });

  const renderAlert = useCallback(() => <StakeDotAlert />, []);

  if (needAlert) {
    // TODO: check connection and requiredNetwork
    return renderAlert();
  }

  return <Dashboard isConnected />;
};
