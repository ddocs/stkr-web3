import React, { useCallback, useMemo } from 'react';
import { useQuery } from '@redux-requests/react';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { useDispatch } from 'react-redux';
import { StakeAvaxAlert } from '../../components/StakeAvaxAlert/StakeAvaxAlert';
import { Dashboard } from '../../components/Dashboard';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { IWalletStatus } from '../../../avalanche-sdk/types';
import { configFromEnv } from '../../../api/config';

export const StakeAvax = () => {
  const dispatch = useDispatch();
  const config = useMemo(() => configFromEnv(), []);

  const {
    data: wallet,
    loading: checkingWallet,
  } = useQuery<IWalletStatus | null>({
    type: AvalancheActions.connect.toString(),
  });

  useInitEffect(() => {
    dispatch(AvalancheActions.connect());
  });

  const renderAlert = useCallback(() => <StakeAvaxAlert />, []);

  if (checkingWallet) {
    return <QueryLoading />;
  }

  if (
    !wallet ||
    (!wallet.isConnected &&
      wallet.requiredNetwork === `${config.providerConfig.avalancheChainId}`)
  ) {
    return renderAlert();
  }

  return wallet && <Dashboard wallet={wallet} />;
};
