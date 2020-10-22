import React from 'react';
import { StakeComponent } from './Stake';
import { DefaultLayoutComponent } from '../../../layout/components/DefautLayout/DefautLayout';
import { YEAR_INTEREST } from '../../../../common/const';

const StakeStory = () => {
  return (
    <div>
      <DefaultLayoutComponent isAuth={true}>
        <StakeComponent
          onSubmit={() => null}
          onCancel={() => null}
          yearlyInterest={YEAR_INTEREST}
        />
      </DefaultLayoutComponent>
    </div>
  );
};

export const StakeExample = () => <StakeStory />;

export default {
  title: 'modules/Stake',
};
