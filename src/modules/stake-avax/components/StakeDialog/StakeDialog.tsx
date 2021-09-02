import { Box, Dialog, IconButton, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React from 'react';
import { t } from '../../../../common/utils/intl';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { IStakeFormValues, StakeForm } from '../StakeForm';
import { useStakeDialogStyles } from './StakeDialogStyles';

interface IStakeDialogProps {
  amount: BigNumber;
  isOpened?: boolean;
  isStakeLoading?: boolean;
  onSubmit: (values: IStakeFormValues) => void;
  onClose?: () => void;
}

export const StakeDialog = ({
  amount,
  isOpened = false,
  isStakeLoading = false,
  onSubmit,
  onClose,
}: IStakeDialogProps) => {
  const classes = useStakeDialogStyles();

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      fullWidth={true}
      scroll="body"
      maxWidth="md"
      PaperProps={{ square: false }}
      classes={{ paper: classes.root }}
    >
      <IconButton className={classes.close} onClick={onClose}>
        <CancelIcon size="xmd" />
      </IconButton>

      <Box mb={5}>
        <Typography variant="h2" align="center">
          {t('stake-avax.stake.title')}
        </Typography>
      </Box>

      <StakeForm
        onSubmit={onSubmit}
        maxAmount={amount}
        loading={isStakeLoading}
      />
    </Dialog>
  );
};
