import React from 'react';
import { Stake } from './Stake';
import { DefaultLayoutComponent } from '../layout/components/DefautLayout/DefautLayout';

const StakeStory = () => {
  return (
    <div>
      <DefaultLayoutComponent isAuth={true}>
        <Stake />
      </DefaultLayoutComponent>
    </div>
  );
};

export const StakeExample = () => <StakeStory />;

export default {
  title: 'modules/Stake',
};
