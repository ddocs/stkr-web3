import { Button, Paper, Typography } from '@material-ui/core';
import { useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { useMemo } from 'react';
import { t } from '../../../../common/utils/intl';
import { Spinner } from '../../../../components/Spinner';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { ClaimDialog } from '../ClaimDialog';
import { useClaimStyles } from './ClaimStyles';

interface IClaimProps {
  amount: BigNumber;
}

export const Claim = ({ amount }: IClaimProps) => {
  const classes = useClaimStyles();
  const isClaimAvailable = useMemo(() => amount && amount.gt(0), [amount]);
  const { loading } = useMutation({
    type: AvalancheActions.claimAAvaxB.toString(),
  });

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <Typography variant="body1" className={classes.header}>
        {t('stake-avax.dashboard.tokens-to-claim')}
      </Typography>

      <div className={classes.footer}>
        <div className={classes.amount}>
          {amount && (
            <Typography variant="h2" className={classes.amountLabel}>
              {amount.toFixed(2)}
            </Typography>
          )}

          <Typography variant="h6">{t('stake-avax.aavaxb')}</Typography>
        </div>

        <Typography variant="body2" className={classes.info} component="p">
          {t('stake-avax.dashboard.claim-info')}
        </Typography>

        <div>
          <ClaimDialog amount={amount}>
            {!loading ? (
              <Button
                color="primary"
                size="large"
                className={classes.buttonClaim}
                type="submit"
                disabled={!isClaimAvailable || loading}
                fullWidth
              >
                {t('stake-avax.dashboard.claim')}
              </Button>
            ) : (
              <Spinner size={32} />
            )}
          </ClaimDialog>
        </div>
      </div>
    </Paper>
  );
};
