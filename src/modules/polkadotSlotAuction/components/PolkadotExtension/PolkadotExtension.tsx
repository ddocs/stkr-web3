import React from 'react';
import { Box, Dialog, IconButton, Typography } from '@material-ui/core';
import { usePolkadotExtensionStyles } from './PolkadotExtensionStyles';
import { t } from '../../../../common/utils/intl';
import { POLKADOT_EXTENSION_LINK } from '../../../../common/const';
import { Button } from '../../../../UiKit/Button';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { ReactComponent as PolkadotExtensionIcon } from './polkadotextension.svg';

export interface IPolkadotExtension {
  isOpened: boolean;
  onClose: () => void;
}

export const PolkadotExtension = ({
  isOpened,
  onClose,
}: IPolkadotExtension) => {
  const classes = usePolkadotExtensionStyles();

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

      <Box textAlign="center" pt={2}>
        <PolkadotExtensionIcon />

        <Typography variant="h3" className={classes.text}>
          {t('polkadot-slot-auction.extensions.connect-polkadot')}
        </Typography>

        <Button
          color="primary"
          size="large"
          className={classes.button}
          href={POLKADOT_EXTENSION_LINK}
          target="_blank"
        >
          {t('polkadot-slot-auction.extensions.install')}
        </Button>
      </Box>
    </Dialog>
  );
};
