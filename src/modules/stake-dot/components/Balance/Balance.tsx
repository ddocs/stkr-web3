import { Box, Button, Paper, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import BigNumber from 'bignumber.js';
import { t } from '../../../../common/utils/intl';
import { ReactComponent as DOTIcon } from '../../assets/DOT.svg';
import { useBalanceStyles } from './BalanceStyles';
import { Body1, Body2 } from '../../../../UiKit/Typography';
import { DEFAULT_FIXED } from '../../../../common/const';

interface IBalanceProps {
  amount: BigNumber;
  isConnected?: boolean;
}

export const Balance = ({ amount, isConnected = false }: IBalanceProps) => {
  const classes = useBalanceStyles();

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <div className={classes.header}>
        <Body1 className={classes.headerContent}>
          <DOTIcon />
          <div className={classes.headerText}>
            {t('stake-dot.dashboard.aDotb-balance')}
          </div>
        </Body1>
        <Body2>
          <a
            href="https://polkadot.network/"
            target="_blank"
            rel="noreferrer"
            className={classes.whatIs}
          >
            {t('stake-dot.dashboard.what-is')}
          </a>
        </Body2>
      </div>

      <div className={classes.footer}>
        {isConnected ? (
          <div className={classes.amount}>
            <Typography variant="h2">
              {amount.decimalPlaces(DEFAULT_FIXED).toFormat()}
            </Typography>
            <Typography variant="h6">{t('stake-dot.aDotb')}</Typography>
          </div>
        ) : (
          <div>
            <Body2 className={classes.info} color="secondary" component="p">
              {t('stake-dot.connect-wallet')}
            </Body2>
          </div>
        )}
        <Tooltip title={t('coming-soon')}>
          <Box display="inline-block">
            <Button
              color="primary"
              size="large"
              className={classes.button}
              disabled
            >
              {t('navigation.connect')}
            </Button>
          </Box>
        </Tooltip>
      </div>
    </Paper>
  );
};
