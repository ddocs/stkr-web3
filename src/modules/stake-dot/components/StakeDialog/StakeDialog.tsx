import { Dialog } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { useStakeDialogStyles } from './StakeDialogStyles';

interface IStakeDialogProps {
  children?: ReactNode;
  isOpened?: boolean;
  onClose?: () => void;
}

export const StakeDialog = ({
  children,
  isOpened = false,
  onClose,
}: IStakeDialogProps) => {
  const classes = useStakeDialogStyles();

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{ square: false }}
      classes={{ paper: classes.root }}
      scroll="body"
    >
      {children}
    </Dialog>
  );
};
