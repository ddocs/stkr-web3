import React from 'react';
import { StakeForm } from '../../components/StakeForm/StakeForm';
import BigNumber from 'bignumber.js';

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
  title: 'modules/staking/avax/form',
};
