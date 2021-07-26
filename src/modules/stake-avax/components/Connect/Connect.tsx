import { Box, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { useConnectStyles } from './ConnectStyles';
import { t } from '../../../../common/utils/intl';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { useDispatch } from 'react-redux';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { BlockchainNetworkId, Milliseconds } from '../../../../common/types';
import BigNumber from 'bignumber.js';
import { DEFAULT_FIXED } from '../../../../common/const';

interface IConnectProps {
  network: BlockchainNetworkId;
  amount?: BigNumber;
  recipient?: string;
}

const REFRESH_INTERVAL: Milliseconds = 20 * 1000;

export const Connect = ({ network, amount, recipient }: IConnectProps) => {
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
      <Box mb={2}>
        <Typography variant="h5" align="center" className={classes.header}>
          {t(`stake-avax.connect.switch-to.${network}`)}
          <Tooltip title={t('stake-avax.connect.switch-to.info')}>
            <IconButton className={classes.question}>
              <QuestionIcon size="xs" />
            </IconButton>
          </Tooltip>
        </Typography>
      </Box>
      <Box mb={1}>
        <Typography variant="subtitle1">
          {t(`stake-avax.connect.claim-on.${network}`, {
            value: amount?.decimalPlaces(DEFAULT_FIXED).toFormat(),
          })}
        </Typography>
      </Box>
      <Typography variant="subtitle1" className={classes.address}>
        {t(`stake-avax.connect.destination.${network}`, { value: recipient })}
      </Typography>
    </Paper>
  );
};
