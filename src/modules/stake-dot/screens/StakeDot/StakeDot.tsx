import React from 'react';
import { useDispatch } from 'react-redux';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { Dashboard } from '../../components/Dashboard';
import { AvalancheActions } from '../../../stake-avax/actions/AvalancheActions';

export const StakeDot = () => {
  const dispatch = useDispatch();

  useInitEffect(() => {
    dispatch(AvalancheActions.fetchTransactionStatus());
  });

  return <Dashboard isConnected />;
};
