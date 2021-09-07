import { IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import React, { useMemo } from 'react';
import { DEFAULT_FIXED } from '../../../../common/const';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { useClaimStyles } from './ClaimStyles';

interface IClaimProps {
  amount?: BigNumber;
  isLoading?: boolean;
  onClaimClick?: () => void;
}

export const ClaimComponent = ({
  amount,
  isLoading,
  onClaimClick,
}: IClaimProps) => {
  const classes = useClaimStyles();
  const isClaimAvailable = useMemo(() => amount && amount.gt(0), [amount]);
  const needInfo = false;

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <Typography className={classes.header}>
        {t('stake-dot.dashboard.tokens-to-claim')}

        <Tooltip title={t('stake-dot.dashboard.claim-tooltip')}>
          <IconButton className={classes.question}>
            <QuestionIcon size="xs" />
          </IconButton>
        </Tooltip>
      </Typography>

      <div className={classes.footer}>
        <div className={classes.amount}>
          <Typography variant="h2" className={classes.amountLabel}>
            {isLoading || !amount ? (
              <Skeleton width={50} />
            ) : (
              amount.decimalPlaces(DEFAULT_FIXED).toFormat()
            )}
          </Typography>

          <Typography variant="h6">{t('stake-dot.aDotb')}</Typography>
        </div>

        {needInfo && (
          <div>
            <Typography
              variant="body2"
              className={classes.info}
              color="secondary"
              component="p"
            >
              {t('stake-dot.dashboard.can-connect-wallet')}
            </Typography>
          </div>
        )}

        <div>
          <Button
            color="primary"
            size="large"
            className={classes.buttonClaim}
            disabled={!isClaimAvailable || isLoading}
            isLoading={isLoading}
            onClick={onClaimClick}
          >
            {t('stake-dot.dashboard.claim')}
          </Button>
        </div>
      </div>
    </Paper>
  );
};
