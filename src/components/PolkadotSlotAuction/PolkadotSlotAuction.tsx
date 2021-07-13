import React from 'react';
import { usePolkadotSlotAuctionStyles } from './PolkadotSlotAuctionStyles';
import { t } from '../../common/utils/intl';
import { Headline3 } from '../../UiKit/Typography';
import { Box } from '@material-ui/core';
import { Ongoing } from './components/Ongoing';
import { Completed } from './components/Completed';

interface IPolkadotSlotAuctionProps {}
// TODO: remove const after SDK
const isConnected = true;

export const PolkadotSlotAuction = ({}: IPolkadotSlotAuctionProps) => {
  const classes = usePolkadotSlotAuctionStyles();

  return (
    <Box display="flex" justifyContent="center" mt={7}>
      <Box minWidth={1180} maxWidth={1460} px={5}>
        <Headline3 className={classes.title}>
          {t('polkadot-slot-auction.tabs.ongoing')}
          {t('polkadot-slot-auction.tabs.completed')}
        </Headline3>

        <Ongoing isConnected={isConnected} />
        <Completed />
      </Box>
    </Box>
  );
};
