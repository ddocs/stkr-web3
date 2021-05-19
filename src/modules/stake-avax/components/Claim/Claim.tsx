import { Button, Paper, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useClaimStyles } from './ClaimStyles';
import { t } from '../../../../common/utils/intl';
import { Body2 } from '../../../../UiKit/Typography';
import BigNumber from 'bignumber.js';
import { ClaimDialog } from '../ClaimDialog';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { useMutation } from '@redux-requests/react';
import { Spinner } from '../../../../components/Spinner';

interface IClaimProps {
  amount: BigNumber;
}

export const Claim = ({ amount }: IClaimProps) => {
  const classes = useClaimStyles({ amount });
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
        <div>
          <Body2 className={classes.info} color="secondary" component="p">
            {t('stake-avax.dashboard.claim-info')}
          </Body2>
        </div>
        <div>
          <ClaimDialog amount={amount}>
            {!loading ? (
              <Button
                color="primary"
                size="large"
                className={classes.buttonClaim}
                type="submit"
                disabled={!isClaimAvailable || loading}
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
