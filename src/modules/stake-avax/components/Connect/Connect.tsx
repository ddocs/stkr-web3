import { Box, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DEFAULT_FIXED } from '../../../../common/const';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { BlockchainNetworkId, Milliseconds } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { useConnectStyles } from './ConnectStyles';

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
      dispatch(AvalancheActions.fetchTransactionStatus());
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
        {t('stake-avax.connect.destination', { value: recipient })}
      </Typography>
    </Paper>
  );
};
