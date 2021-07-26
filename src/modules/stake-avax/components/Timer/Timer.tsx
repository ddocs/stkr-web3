import { Box, BoxProps, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useQuery } from '@redux-requests/react';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '../../../../common/utils/intl';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { Timer as BasicTimer } from '../../../governance/components/Timer';
import { useWalletStatus } from '../../hooks/useWalletStatus';
import { useTimerStyles } from './useTimerStyles';

interface ITimerProps extends BoxProps {
  endDate?: Date;
  isLoading?: boolean;
}

const TimerComponent = ({
  endDate,
  className,
  isLoading = false,
  ...restProps
}: ITimerProps) => {
  const classes = useTimerStyles();

  return (
    <Box {...restProps} className={classNames(className, classes.root)}>
      <Typography color="secondary" variant="body2" className={classes.title}>
        {t('stake-avax.dashboard.validating-period')}
      </Typography>

      <Typography variant="h5" className={classes.timer}>
        {(isLoading || !endDate) && (
          <Skeleton width={140} className={classes.timerSkeleton} />
        )}

        {!isLoading && endDate && <BasicTimer endTime={endDate} />}
      </Typography>
    </Box>
  );
};

export const Timer = () => {
  const { isAvalancheChain } = useWalletStatus();
  const dispatch = useDispatch();

  const {
    data: claimServeTime,
    loading: claimServeTimeLoading,
    error: claimServeTimeError,
  } = useQuery<Date | null>({
    type: AvalancheActions.fetchClaimServeTime.toString(),
  });

  useEffect(() => {
    if (!isAvalancheChain) {
      return;
    }

    dispatch(AvalancheActions.fetchClaimServeTime());
  }, [dispatch, isAvalancheChain]);

  if (claimServeTimeLoading) {
    return <TimerComponent isLoading />;
  }

  if (claimServeTimeError || !claimServeTime) {
    return null;
  }

  return <TimerComponent endDate={claimServeTime} />;
};
