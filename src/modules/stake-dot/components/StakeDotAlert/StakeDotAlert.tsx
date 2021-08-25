import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { ReactComponent as StakeDotIcon } from '../../../features/assets/polkadot.svg';
import { useStakeDotAlertStyles } from './StakeDotAlertStyles';
import { t } from '../../../../common/utils/intl';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { Headline2 } from '../../../../UiKit/Typography';

const REFRESH_INTERVAL = 5 * 1000;

export const StakeDotAlert = () => {
  const classes = useStakeDotAlertStyles();

  useInitEffect(() => {
    const interval = setInterval(() => {
      console.log('dispatch check wallet');
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  });

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
