import * as React from 'react';
import { useDepositStyles } from './ConfirmsStyles';
import { Box, Typography } from '@material-ui/core';
import { t } from '../../../../common/utils/intl';
import { Spinner } from '../../../../components/Spinner';

const REQUIRED_CONFIRMATIONS_COUNT = 15;

export interface IConfirmProps {
  confirms?: number;
}

export const Confirms = ({ confirms }: IConfirmProps) => {
  const classes = useDepositStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" align="center" className={classes.title}>
        {t('confirms.title')}
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color="textSecondary"
        className={classes.notice}
      >
        {t('confirms.notice')}
      </Typography>
      <Box mb={4.5}>
        <Spinner />
      </Box>
      {confirms && (
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          className={classes.confirmations}
        >
          {t('confirms.confirmation', {
            current: confirms,
            required: REQUIRED_CONFIRMATIONS_COUNT,
          })}
        </Typography>
      )}
    </div>
  );
};
