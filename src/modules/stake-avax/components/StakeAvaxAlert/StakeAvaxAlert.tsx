import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { ReactComponent as StakeAvalancheIcon } from '../../../features/assets/stake-avax.svg';
import { useStakeAvaxAlertStyles } from './StakeAvaxAlertStyles';
import { t } from '../../../../common/utils/intl';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { useDispatch } from 'react-redux';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';

const REFRESH_INTERVAL = 5 * 1000;

export const StakeAvaxAlert = () => {
  const classes = useStakeAvaxAlertStyles();
  const dispatch = useDispatch();

  useInitEffect(() => {
    const interval = setInterval(() => {
      dispatch(AvalancheActions.checkWallet());
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  });

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <div className={classes.headerContainer}>
        <StakeAvalancheIcon className={classes.icon} />
        <Typography variant="h2">
          {t('features-list.header.stake-avax')}
        </Typography>
      </div>
      <Typography className={classes.info}>
        {t('stake-avax.connect-wallet')}
      </Typography>
    </Paper>
  );
};
