import React from 'react';
import { StakeForm } from './StakeForm';
import BigNumber from 'bignumber.js';

const StakeFormStory = () => {
  return (
    <StakeForm
      onSubmit={() => null}
      onCancel={() => null}
      yearlyInterest={0.3}
      stakingFeeRate={new BigNumber(1)}
      stakingAmountStep={1}
      loading={false}
    />
  );
};

export const StakeFormExample = () => <StakeFormStory />;

export default {
  title: 'modules/StakeForm',
};
