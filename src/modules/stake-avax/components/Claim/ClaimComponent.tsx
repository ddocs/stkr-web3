import { Box, Grid, Paper, Tooltip, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useMemo } from 'react';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { BalanceTitle } from '../BalanceTitle';
import { BalanceValue } from '../BalanceValue';
import { useClaimStyles } from './ClaimStyles';

const ENABLED_UNSTAKE = true;

interface IClaimProps {
  amount: BigNumber;
  claimLoading?: boolean;
  unstakeLoading?: boolean;
  onUnstakeClick?: () => void;
  onClaimClick?: () => void;
}

export const ClaimComponent = ({
  amount,
  claimLoading,
  unstakeLoading,
  onUnstakeClick,
  onClaimClick,
}: IClaimProps) => {
  const classes = useClaimStyles();
  const isClaimAvailable = useMemo(() => amount && amount.gt(0), [amount]);

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <Box mb={{ xs: 6, sm: 8 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm>
            <BalanceTitle title={t('stake-avax.dashboard.tokens-to-claim')} />
          </Grid>

          <Grid item xs={12} sm="auto">
            <Typography variant="body2" className={classes.info} component="p">
              {t('stake-avax.dashboard.claim-info')}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} sm>
          <BalanceValue
            mb={{ xs: 1, sm: 0 }}
            amount={amount}
            currencyType={t('stake-avax.aavaxb')}
          />
        </Grid>

        <Grid item xs={12} sm="auto">
          <Tooltip title={t('coming-soon')}>
            <div>
              <Button
                size="large"
                color="secondary"
                variant="outlined"
                className={classes.button}
                type="submit"
                disabled={
                  !isClaimAvailable || unstakeLoading || !ENABLED_UNSTAKE
                }
                isLoading={unstakeLoading}
                onClick={onUnstakeClick}
                fullWidth
              >
                {t('stake-avax.unstake.btn')}
              </Button>
            </div>
          </Tooltip>
        </Grid>

        <Grid item xs={12} sm="auto">
          <Button
            size="large"
            color="secondary"
            variant="outlined"
            className={classes.button}
            type="submit"
            disabled={!isClaimAvailable || claimLoading}
            isLoading={claimLoading}
            onClick={onClaimClick}
            fullWidth
          >
            {t('stake-avax.dashboard.claim')}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
