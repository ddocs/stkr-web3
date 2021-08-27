import { Paper } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React from 'react';
import { t } from '../../../../common/utils/intl';
import { AvaxIcon } from '../../../../UiKit/Icons/AvaxIcon';
import { BalanceTitle } from '../BalanceTitle';
import { BalanceValue } from '../BalanceValue';
import { useBalanceStyles } from './BalanceStyles';

interface IBalanceProps {
  amount: BigNumber;
}

export const BalanceComponent = ({ amount }: IBalanceProps) => {
  const classes = useBalanceStyles();

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <BalanceTitle
        mb={{ xs: 6, sm: 8 }}
        title={t('stake-avax.dashboard.avax-balance')}
        icon={<AvaxIcon />}
      />

      <div className={classes.footer}>
        <BalanceValue amount={amount} currencyType={t('stake-avax.avax')} />
      </div>
    </Paper>
  );
};
