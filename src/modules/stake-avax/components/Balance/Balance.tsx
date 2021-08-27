import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React from 'react';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { BalanceComponent } from './BalanceComponent';

export const Balance = () => {
  const dispatchRequest = useDispatchRequest();

  const { data, loading } = useQuery<BigNumber | null>({
    type: AvalancheActions.fetchUnstakedBalance.toString(),
  });

  useInitEffect(() => {
    if (!data && !loading) {
      dispatchRequest(AvalancheActions.fetchUnstakedBalance());
    }
  });

  if (!data || data.isEqualTo(0)) {
    return null;
  }

  return <BalanceComponent amount={data} isBalanceLoading={loading} />;
};
