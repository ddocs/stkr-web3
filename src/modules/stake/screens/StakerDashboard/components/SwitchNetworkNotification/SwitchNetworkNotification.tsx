import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { t } from '../../../../../../common/utils/intl';
import { useSwitchNetworkNotificationStyles } from './SwitchNetworkNotificationStyles';

export const SwitchNetworkNotification = () => {
  const classes = useSwitchNetworkNotificationStyles();

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <Typography variant="body1" align="center" className={classes.notice}>
        {t('switch-network-notification.notice')}
      </Typography>
    </Paper>
  );
};
