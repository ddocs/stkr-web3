import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { usePolkadotExtensionStyles } from './PolkadotExtensionStyles';
import { ReactComponent as PolkadotExtensionIcon } from '../../modules/polkadotSlotAuction/components/PolkadotExtension/polkadotextension.svg';
import { t } from '../../common/utils/intl';
import { Button } from '../../UiKit/Button';
import { POLKADOT_EXTENSION_LINK } from '../../common/const';

export const PolkadotExtension = () => {
  const classes = usePolkadotExtensionStyles();

  return (
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
  );
};
