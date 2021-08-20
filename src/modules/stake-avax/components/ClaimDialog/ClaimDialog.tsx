import { Box, Dialog, IconButton, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { t } from '../../../../common/utils/intl';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { useClaimDialogStyles } from './ClaimDialogStyles';

interface IClaimDialogProps {
  isOpened?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const ClaimDialog = ({
  isOpened = false,
  onClose,
  children,
}: IClaimDialogProps) => {
  const classes = useClaimDialogStyles();

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      scroll="body"
      fullWidth={true}
      maxWidth="md"
      PaperProps={{ square: false }}
      classes={{ paper: classes.root }}
    >
      <IconButton className={classes.close} onClick={onClose}>
        <CancelIcon size="xmd" />
      </IconButton>

      <Box
        mb={{ xs: 4, sm: 6 }}
        mt={{ xs: 6, sm: 1 }}
        className={classes.container}
      >
        <Typography variant="h3" className={classes.title}>
          {t('stake-avax.claim.title')}
        </Typography>
      </Box>

      {children}
    </Dialog>
  );
};
