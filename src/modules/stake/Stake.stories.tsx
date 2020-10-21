import React from 'react';
import { StakeComponent } from './Stake';
import { DefaultLayoutComponent } from '../layout/components/DefautLayout/DefautLayout';

const StakeStory = () => {
  return (
    <div>
      <DefaultLayoutComponent isAuth={true}>
        <StakeComponent onSubmit={() => null} />
      </DefaultLayoutComponent>
    </div>
  );
};

export const StakeExample = () => <StakeStory />;

export default {
  title: 'modules/Stake',
};
