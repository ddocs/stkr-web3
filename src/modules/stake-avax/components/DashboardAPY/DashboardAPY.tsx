import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '../../../../common/utils/intl';
import { AvalancheActions } from '../../actions/AvalancheActions';
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

  const { data, error, loading } = useQuery<BigNumber | null>({
    type: AvalancheActions.fetchEstimatedAPY.toString(),
  });

  useEffect(() => {
    dispatch(AvalancheActions.fetchEstimatedAPY());
  }, [dispatch]);

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
