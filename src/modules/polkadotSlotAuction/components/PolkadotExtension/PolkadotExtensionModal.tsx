import React from 'react';
import { Dialog, IconButton } from '@material-ui/core';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { PolkadotExtension } from '../../../../components/PolkadotExtension';
import { usePolkadotExtensionModalStyles } from './PolkadotExtensionModalStyles';

export interface IPolkadotExtensionModal {
  isOpened: boolean;
  onClose: () => void;
}

export const PolkadotExtensionModal = ({
  isOpened,
  onClose,
}: IPolkadotExtensionModal) => {
  const classes = usePolkadotExtensionModalStyles();

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      scroll="body"
      maxWidth="sm"
      PaperProps={{ square: false }}
      classes={{ paper: classes.root }}
    >
      <IconButton className={classes.close} onClick={onClose}>
        <CancelIcon size="xmd" />
      </IconButton>

      <PolkadotExtension />
    </Dialog>
  );
};
