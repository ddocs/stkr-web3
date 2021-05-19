import BigNumber from 'bignumber.js';
import React from 'react';
import { ClaimForm } from '../../components/ClaimForm';

const ClaimFormStory = () => {
  return (
    <ClaimForm
      loading={false}
      amount={new BigNumber('20')}
      onSubmit={() => null}
    />
  );
};

export const ClaimFormExample = () => <ClaimFormStory />;

export default {
  title: 'modules/staking/avax/network',
};
