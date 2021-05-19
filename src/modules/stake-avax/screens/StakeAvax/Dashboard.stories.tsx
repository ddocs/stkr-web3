import React from 'react';
import { Dashboard } from '../../components/Dashboard/Dashboard';
import { DefaultLayoutComponent } from '../../../layout/components/DefautLayout/DefautLayout';
import BigNumber from 'bignumber.js';
import { StakingStep } from '../../../avalanche-sdk/types';

const StakeAvaxDashboardStory = () => {
  return (
    <div>
      <DefaultLayoutComponent isAuth={true}>
        <Dashboard
          wallet={{
            step: StakingStep.Stake,
            isConnected: true,
            requiredNetwork: '97',
          }}
        />
      </DefaultLayoutComponent>
    </div>
  );
};

export const StakeAvaxDashboardExample = () => <StakeAvaxDashboardStory />;

export default {
  title: 'modules/staking/avax/dashboard',
};
