import { IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { useConnectStyles } from './ConnectStyles';
import { t } from '../../../../common/utils/intl';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { useDispatch } from 'react-redux';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';

interface IConnectProps {
  network: string;
}

const REFRESH_INTERVAL = 5 * 1000;

export const Connect = ({ network }: IConnectProps) => {
  const classes = useConnectStyles();
  const dispatch = useDispatch();

  useInitEffect(() => {
    const interval = setInterval(() => {
      dispatch(AvalancheActions.checkWallet());
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  });

  return (
    <Paper variant="outlined" square={false} classes={{ root: classes.root }}>
      <Typography variant="h3" className={classes.header}>
        {t(`stake-avax.dashboard.connect.${network.toString()}`)}
        <Tooltip title={t('stake-avax.dashboard.connect.info')}>
          <IconButton className={classes.question}>
            <QuestionIcon size="xs" />
          </IconButton>
        </Tooltip>
      </Typography>
    </Paper>
  );
};
