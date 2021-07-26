import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '../../../../common/utils/intl';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { useWalletStatus } from '../../hooks/useWalletStatus';
import { useDashboardAPYStyles } from './useDashboardAPYStyles';

interface IDashboardAPYProps {
  children: ReactNode;
}

const DashboardAPYComponent = ({ children }: IDashboardAPYProps) => {
  const classes = useDashboardAPYStyles();

  return (
    <Typography
      variant="body2"
      color="textSecondary"
      className={classes.apyValue}
    >
      {children}
    </Typography>
  );
};

const DashboardAPYSkeleton = () => {
  return (
    <DashboardAPYComponent>
      <Skeleton width={80} />
    </DashboardAPYComponent>
  );
};

export const DashboardAPY = () => {
  const dispatch = useDispatch();
  const { isAvalancheChain } = useWalletStatus();

  const { data, error, loading } = useQuery<BigNumber | null>({
    type: AvalancheActions.fetchEstimatedAPY.toString(),
  });

  useEffect(() => {
    if (!isAvalancheChain) {
      return;
    }

    dispatch(AvalancheActions.fetchEstimatedAPY());
  }, [dispatch, isAvalancheChain]);

  if (loading) {
    return <DashboardAPYSkeleton />;
  }

  if (error || !data) {
    return null;
  }

  return (
    <DashboardAPYComponent>
      {t('stake-avax.dashboard.apy', {
        value: data.decimalPlaces(2).toFormat(),
      })}
    </DashboardAPYComponent>
  );
};
