import BigNumber from 'bignumber.js';
import React from 'react';
import { StakeForm } from '../../components/StakeForm/StakeForm';

const AvaxStakeFormStory = () => {
  return (
    <StakeForm
      onSubmit={() => null}
      loading={false}
      maxAmount={new BigNumber(2)}
    />
  );
};

export const AvaxStakeFormExample = () => <AvaxStakeFormStory />;

export default {
  title: 'modules/AvaxStaking/components/form',
};
