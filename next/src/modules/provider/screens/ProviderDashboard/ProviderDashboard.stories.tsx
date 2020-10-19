import React from 'react';
import { ProviderDashboardComponent } from './ProviderDashboard';

const ProviderDashboardStory = () => {
  return (
    <ProviderDashboardComponent totalStakersInEthereum={64} totalStakers={2} />
  );
};

export const ProviderDashboardExample = () => <ProviderDashboardStory />;

export default {
  title: 'modules/provider/ProviderDashboard',
};
