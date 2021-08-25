import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { ReactComponent as StakeDotIcon } from '../../../features/assets/polkadot.svg';
import { useStakeDotAlertStyles } from './StakeDotAlertStyles';
import { t } from '../../../../common/utils/intl';
import { Headline2 } from '../../../../UiKit/Typography';
import { Milliseconds } from '../../../../common/types';
import { useInterval } from '../../../../common/utils/useInterval';

const REFRESH_INTERVAL: Milliseconds = 5000;

export const StakeDotAlert = () => {
  const classes = useStakeDotAlertStyles();

  useInterval(() => {
    console.log('dispatch check wallet');
  }, REFRESH_INTERVAL);

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <div className={classes.headerContainer}>
        <StakeDotIcon className={classes.icon} />
        <Headline2>{t('features-list.header.stake-dot')}</Headline2>
      </div>
      <Typography className={classes.info}>
        {t('stake-dot.connect-wallet')}
      </Typography>
    </Paper>
  );
};
