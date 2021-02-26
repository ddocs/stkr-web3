import React from 'react';
import { DefaultLayoutComponent } from '../../../layout/components/DefautLayout/DefautLayout';
import { StakeComponent } from './Stake';

const StakeStory = () => {
  return (
    <div>
      <DefaultLayoutComponent isAuth={true}>
        <StakeComponent
          onSubmit={() => null}
          onCancel={() => null}
          yearlyInterest={20.5}
        />
      </DefaultLayoutComponent>
    </div>
  );
};

export const StakeExample = () => <StakeStory />;

export default {
  title: 'modules/Stake',
};
