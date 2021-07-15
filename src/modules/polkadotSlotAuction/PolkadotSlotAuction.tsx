import React, { useState } from 'react';
import { uid } from 'react-uid';
import { Box } from '@material-ui/core';
import { Headline3 } from '../../UiKit/Typography';
import { t } from '../../common/utils/intl';
import { Ongoing } from './components/Ongoing';
import { Completed } from './components/Completed';
import { MyRewards } from './components/MyRewards';
import { usePolkadotSlotAuctionStyles } from './PolkadotSlotAuctionStyles';

// TODO: remove const after SDK
const isConnected = true;

interface IPolkadotSlotAuctionProps {}

export const PolkadotSlotAuction = ({}: IPolkadotSlotAuctionProps) => {
  const classes = usePolkadotSlotAuctionStyles();

  const ongoingText = t('polkadot-slot-auction.tabs.ongoing');
  const completedText = t('polkadot-slot-auction.tabs.completed');
  const myRewardsText = t('polkadot-slot-auction.tabs.my-rewards');

  const [currentTab, setCurrentTab] = useState<string>(ongoingText);

  const handleChangeTab = (newTab: string) => () => {
    setCurrentTab(newTab);
  };

  const BodyComponent = {
    [ongoingText]: <Ongoing isConnected={isConnected} />,
    [completedText]: <Completed />,
    [myRewardsText]: <MyRewards />,
  };

  const tabs = Object.keys(BodyComponent);

  if (!isConnected) {
    tabs.splice(1, 2);
  }

  return (
    <Box width={1280} className={classes.wrapper} px={4}>
      <Box display="flex">
        {(tabs as string[]).map(tab => (
          <Box key={uid(tab)} onClick={handleChangeTab(tab)} mr={4} mb={3.5}>
            <Headline3 color={tab === currentTab ? 'initial' : 'secondary'}>
              {tab}
            </Headline3>
          </Box>
        ))}
      </Box>

      {BodyComponent[currentTab]}
    </Box>
  );
};
