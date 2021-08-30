import { Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React from 'react';
import { t } from '../../../../common/utils/intl';
import { BalanceTitle } from '../BalanceTitle';
import { BalanceValue } from '../BalanceValue';
import { useBalanceStyles } from './BalanceStyles';

interface IBalanceProps {
  amount: BigNumber;
  isBalanceLoading?: boolean;
}

export const BalanceComponent = ({
  amount,
  isBalanceLoading = false,
}: IBalanceProps) => {
  const classes = useBalanceStyles();

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <BalanceTitle
        mb={{ xs: 6, sm: 8 }}
        title={t('stake-avax.dashboard.unstaked-balance')}
      />

      <div className={classes.footer}>
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item xs={12} sm="auto">
            <BalanceValue
              amount={amount}
              isLoading={isBalanceLoading}
              currencyType={t('stake-avax.avax')}
            />
          </Grid>

          <Grid item xs={12} sm="auto">
            <Typography className={classes.info} variant="body2">
              {t('stake-avax.dashboard.unstaked-balance-info')}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};
