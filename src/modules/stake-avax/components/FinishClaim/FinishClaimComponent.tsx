import { Grid, Paper } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React from 'react';
import { BlockchainNetworkId } from '../../../../common/types';
import { getNetworkName } from '../../../../common/utils/getNetworkName';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { BalanceTitle } from '../BalanceTitle';
import { BalanceValue } from '../BalanceValue';
import { useFinishClaimStyles } from './useFinishClaimStyles';

interface IFinishClaimProps {
  amount?: BigNumber;
  isLoading?: boolean;
  onClick?: () => void;
  from?: BlockchainNetworkId;
  to?: BlockchainNetworkId;
}

export const FinishClaimComponent = ({
  amount,
  isLoading,
  from,
  to,
  onClick,
}: IFinishClaimProps) => {
  const classes = useFinishClaimStyles();

  return (
    <Paper variant="outlined" square={false} classes={{ root: classes.root }}>
      <BalanceTitle
        mb={{ xs: 6, sm: 8 }}
        title={t('stake-avax.finish-claim.title', {
          from: from ? getNetworkName(from) : '…',
          to: to ? getNetworkName(to) : '…',
        })}
      />

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm="auto">
          <BalanceValue amount={amount} currencyType={t('stake-avax.aavaxb')} />
        </Grid>

        <Grid item xs={12} sm="auto">
          <Button
            color="primary"
            size="large"
            className={classes.button}
            onClick={onClick}
            disabled={isLoading}
            isLoading={isLoading}
            fullWidth
          >
            {t('stake-avax.finish-claim.btn')}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
