import React from 'react';
import { DefaultLayoutComponent } from '../../../layout/components/DefautLayout/DefautLayout';
import { StakeAvaxAlert } from '../../components/StakeAvaxAlert/StakeAvaxAlert';

const StakerDashboardStory = () => {
  return (
    <DefaultLayoutComponent isAuth={true}>
      <StakeAvaxAlert />
    </DefaultLayoutComponent>
  );
};

export const StakerDashboardExample = () => <StakerDashboardStory />;

export default {
  title: 'modules/staking/avax/alert',
};
