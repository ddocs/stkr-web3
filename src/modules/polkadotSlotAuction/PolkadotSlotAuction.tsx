import React, { useState } from 'react';
import { uid } from 'react-uid';
import { Query } from '@redux-requests/react';
import { Box } from '@material-ui/core';
import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';
import { Headline3 } from '../../UiKit/Typography';
import { t } from '../../common/utils/intl';
import { Ongoing } from './components/Ongoing';
import { Completed } from './components/Completed';
import { MyRewards } from './components/MyRewards';
import { QueryError } from '../../components/QueryError/QueryError';
import { QueryLoading } from '../../components/QueryLoading/QueryLoading';
import { SlotAuctionActions } from './actions/SlotAuctionActions';
import { usePolkadotSlotAuctionStyles } from './PolkadotSlotAuctionStyles';
import { useSlotAuctionSdk } from './hooks/useSlotAuctionSdk';

export const PolkadotSlotAuction = () => {
  const classes = usePolkadotSlotAuctionStyles();

  const { isConnected } = useSlotAuctionSdk();

  const ongoingText = t('polkadot-slot-auction.tabs.ongoing');
  const completedText = t('polkadot-slot-auction.tabs.completed');
  const myRewardsText = t('polkadot-slot-auction.tabs.my-rewards');
  const [currentTab, setCurrentTab] = useState<string>(ongoingText);
  const BodyComponent = {
    [ongoingText]: <Ongoing />,
    [completedText]: <Completed />,
    [myRewardsText]: <MyRewards />,
  };

  const tabs = Object.keys(BodyComponent);
  if (!isConnected) {
    tabs.splice(1, 2);
  }

  const handleChangeTab = (newTab: string) => () => {
    setCurrentTab(newTab);
  };

  return (
    <Query<SlotAuctionSdk>
      type={SlotAuctionActions.initialize.toString()}
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      showLoaderDuringRefetch={false}
    >
      {() => (
        <Box width={1280} className={classes.wrapper} px={4}>
          <Box display="flex">
            {(tabs as string[]).map(tab => (
              <Box
                key={uid(tab)}
                onClick={handleChangeTab(tab)}
                mr={4}
                mb={3.5}
              >
                <Headline3 color={tab === currentTab ? 'initial' : 'secondary'}>
                  {tab}
                </Headline3>
              </Box>
            ))}
          </Box>

          {BodyComponent[currentTab]}
        </Box>
      )}
    </Query>
  );
};
