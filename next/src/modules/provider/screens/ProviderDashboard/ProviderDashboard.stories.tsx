import React from 'react';
import { ProviderDashboardComponent } from './ProviderDashboard';
import { MICRO_POOL_DATA } from '../../mock';

const ProviderDashboardStory = () => {
  return (
    <ProviderDashboardComponent
      totalStakersInEthereum={64}
      totalStakers={2}
      micropool={MICRO_POOL_DATA}
    />
  );
};

export const ProviderDashboardExample = () => <ProviderDashboardStory />;

export default {
  title: 'modules/provider/ProviderDashboard',
};
