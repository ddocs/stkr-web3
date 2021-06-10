import React from 'react';
import { StakerDashboardBnbComponent } from './StakerDashboardBnb';
import BigNumber from 'bignumber.js';

const StakerDashboardBnbStory = () => {
  return (
    <StakerDashboardBnbComponent
      walletBalance={new BigNumber(500)}
      delegated={new BigNumber(100)}
      rewardsAmount={new BigNumber(100)}
      walletAccountId={'1'}
    />
  );
};

export const StakerDashboardBnbExample = () => <StakerDashboardBnbStory />;

export default {
  title: 'modules/StakerDashboardBnb',
};
