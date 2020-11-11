import React from 'react';
import { StakerDashboardComponent } from './StakerDashboard';
import { DefaultLayoutComponent } from '../../../layout/components/DefautLayout/DefautLayout';

const StakerDashboardStory = () => {
  return (
    <div>
      <DefaultLayoutComponent isAuth={true}>
        <StakerDashboardComponent />
      </DefaultLayoutComponent>
    </div>
  );
};

export const StakerDashboardExample = () => <StakerDashboardStory />;

export default {
  title: 'modules/StakerDashboard',
};
