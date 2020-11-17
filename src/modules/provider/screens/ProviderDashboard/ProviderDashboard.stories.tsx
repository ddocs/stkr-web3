import React from 'react';
import { ProviderDashboardComponent } from './ProviderDashboard';

const ProviderDashboardStory = () => {
  return <ProviderDashboardComponent sidecars={[]} />;
};

export const ProviderDashboardExample = () => <ProviderDashboardStory />;

export default {
  title: 'modules/provider/ProviderDashboard',
};
