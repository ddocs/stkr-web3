import React, { useEffect, useState } from 'react';
import { uid } from 'react-uid';
import { Box } from '@material-ui/core';
import { Headline3 } from '../../UiKit/Typography';
import { t } from '../../common/utils/intl';
import { Ongoing } from './components/Ongoing';
import { Completed } from './components/Completed';
import { MyRewards } from './components/MyRewards';
import { usePolkadotSlotAuctionStyles } from './PolkadotSlotAuctionStyles';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';
import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';

interface IPolkadotSlotAuctionProps {}

export const PolkadotSlotAuction = ({}: IPolkadotSlotAuctionProps) => {
  const classes = usePolkadotSlotAuctionStyles();

  const ongoingText = t('polkadot-slot-auction.tabs.ongoing');
  const completedText = t('polkadot-slot-auction.tabs.completed');
  const myRewardsText = t('polkadot-slot-auction.tabs.my-rewards');

  const [currentTab, setCurrentTab] = useState<string>(ongoingText);
  const [slotAuctionSdk] = useState<SlotAuctionSdk>(() => {
    const web3KeyProvider = new Web3KeyProvider({
      /* TODO: "replace me with config" */
      expectedChainId: 5,
    });
    /* TODO: "by default it uses develop config, replace with envs" */
    return new SlotAuctionSdk(web3KeyProvider);
  });
  useEffect(() => {
    /* TODO: "manage connection state using reducers" */
    slotAuctionSdk.connect().then(() => {
      // idk how to refresh the page normally
      setCurrentTab(completedText);
      setImmediate(() => {
        setCurrentTab(ongoingText);
      });
      console.log(`Slot Auction SKD successfully connected`);
    });
  }, [slotAuctionSdk, ongoingText, completedText]);
  const isConnected = slotAuctionSdk.isConnected();

  const handleChangeTab = (newTab: string) => () => {
    setCurrentTab(newTab);
  };

  const BodyComponent = {
    [ongoingText]: <Ongoing slotAuctionSdk={slotAuctionSdk} />,
    [completedText]: <Completed slotAuctionSdk={slotAuctionSdk} />,
    [myRewardsText]: <MyRewards slotAuctionSdk={slotAuctionSdk} />,
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
