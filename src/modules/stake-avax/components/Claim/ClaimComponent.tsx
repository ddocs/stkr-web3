import { Box, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { ReactNode, useMemo } from 'react';
import { featuresConfig } from '../../../../common/const';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { AAvaxBIcon } from '../../../../UiKit/Icons/AAvaxBIcon';
import { BalanceTitle } from '../BalanceTitle';
import { BalanceValue } from '../BalanceValue';
import { useClaimStyles } from './ClaimStyles';

interface IClaimProps {
  amount: BigNumber;
  apyInfo?: ReactNode;
  claimLoading?: boolean;
  onClaimClick?: () => void;
  stakeBtn?: ReactNode;
  unstakeBtn?: ReactNode;
}

export const ClaimComponent = ({
  amount,
  apyInfo,
  claimLoading,
  onClaimClick,
  stakeBtn,
  unstakeBtn,
}: IClaimProps) => {
  const classes = useClaimStyles();
  const isClaimAvailable = useMemo(() => amount && amount.gt(0), [amount]);

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <Box mb={{ xs: 6, sm: 8 }}>
        <BalanceTitle
          title={t('stake-avax.dashboard.internet-bond')}
          icon={<AAvaxBIcon />}
        />
        {apyInfo && (
          <Box mt={1} mb={-2}>
            {apyInfo}
          </Box>
        )}
      </Box>

      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} sm="auto">
          <BalanceValue
            mb={{ xs: 1, sm: 0 }}
            mr={1}
            amount={amount}
            currencyType={t('stake-avax.aavaxb')}
          />
        </Grid>

        {stakeBtn && (
          <Grid item xs="auto">
            {stakeBtn}
          </Grid>
        )}

        {unstakeBtn && (
          <Grid item xs="auto">
            {unstakeBtn}
          </Grid>
        )}

        <Grid item xs sm="auto">
          {featuresConfig.avalancheBridge ? (
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
              {t('stake-avax.dashboard.bridge')}
            </Button>
          ) : (
            <Button
              size="large"
              color="secondary"
              className={classes.button}
              classes={{ label: classes.buttonLabel }}
              disabled
              fullWidth
            >
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {t('stake-avax.dashboard.bridge')}
              </Typography>

              <span className={classes.buttonInfo}>{t('coming-soon')}</span>
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
