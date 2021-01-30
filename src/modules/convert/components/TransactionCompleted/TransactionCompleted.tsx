import * as React from 'react';
import { useTransactionCompleted } from './TransactionCompletedStyles';
import { Typography } from '@material-ui/core';
import { t } from '../../../../common/utils/intl';

export const TransactionCompleted = () => {
  const classes = useTransactionCompleted();

  return (
    <div className={classes.root}>
      <Typography variant="h2" align="center" className={classes.title}>
        {t('transaction-completed.title')}
      </Typography>
      <Typography variant="body1" align="center">
        {t('transaction-completed.notice')}
      </Typography>
    </div>
  );
};
