import { useQuery } from '@redux-requests/react';
import React from 'react';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { IStakerStats } from '../../api/types';
import { BalanceComponent } from './BalanceComponent';

export const Balance = () => {
  const { data } = useQuery<IStakerStats | null>({
    type: AvalancheActions.fetchStakerStats.toString(),
  });

  if (!data) {
    return null;
  }

  return <BalanceComponent amount={data.balance} />;
};
