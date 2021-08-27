import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '../../../../common/utils/intl';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { useStakingAPYStyles } from './useStakingAPYStyles';

interface IDashboardAPYProps {
  children: ReactNode;
}

const StakingAPYComponent = ({ children }: IDashboardAPYProps) => {
  const classes = useStakingAPYStyles();

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

const StakingAPYSkeleton = () => {
  return (
    <StakingAPYComponent>
      <Skeleton width={80} />
    </StakingAPYComponent>
  );
};

export const StakingAPY = () => {
  const dispatch = useDispatch();

  const { data, error, loading } = useQuery<BigNumber | null>({
    type: AvalancheActions.fetchEstimatedAPY.toString(),
  });

  useEffect(() => {
    dispatch(AvalancheActions.fetchEstimatedAPY());
  }, [dispatch]);

  if (loading) {
    return <StakingAPYSkeleton />;
  }

  if (error || !data || data.isNaN()) {
    return null;
  }

  return (
    <StakingAPYComponent>
      {t('stake-avax.dashboard.apy', {
        value: data.decimalPlaces(2).toFormat(),
      })}
    </StakingAPYComponent>
  );
};
