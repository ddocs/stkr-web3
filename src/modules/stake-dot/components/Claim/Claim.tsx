import {
  Button,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { t } from '../../../../common/utils/intl';
import { Body1, Body2 } from '../../../../UiKit/Typography';

import { useClaimStyles } from './ClaimStyles';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';

interface IClaimProps {
  amount: BigNumber;
}

export const Claim = ({ amount }: IClaimProps) => {
  const classes = useClaimStyles({ amount });
  const isClaimAvailable = useMemo(() => amount && amount.gt(0), [amount]);
  const needInfo = false;

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <Body1 className={classes.header}>
        {t('stake-dot.dashboard.tokens-to-claim')}
        <Tooltip title={t('stake-dot.dashboard.claim-tooltip')}>
          <IconButton className={classes.question}>
            <QuestionIcon size="xs" />
          </IconButton>
        </Tooltip>
      </Body1>
      <div className={classes.footer}>
        <div className={classes.amount}>
          <Typography variant="h2" className={classes.amountLabel}>
            {amount.toFixed(2)}
          </Typography>
          <Typography variant="h6">{t('stake-dot.aDotb')}</Typography>
        </div>
        {needInfo && (
          <div>
            <Body2 className={classes.info} color="secondary" component="p">
              {t('stake-dot.dashboard.can-connect-wallet')}
            </Body2>
          </div>
        )}
        <div>
          <Button
            color="primary"
            size="large"
            className={classes.buttonClaim}
            type="submit"
            disabled={!isClaimAvailable}
          >
            {t('stake-avax.dashboard.claim')}
          </Button>
        </div>
      </div>
    </Paper>
  );
};
