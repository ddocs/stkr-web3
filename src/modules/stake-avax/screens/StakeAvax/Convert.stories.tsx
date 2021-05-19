import BigNumber from 'bignumber.js';
import React from 'react';
import { ConvertForm } from '../../components/ConvertForm';

const ConvertFormStory = () => {
  return (
    <ConvertForm
      onSubmit={() => null}
      maxAmount={new BigNumber(5)}
      loading={false}
    />
  );
};

export const ConvertFormExample = () => <ConvertFormStory />;

export default {
  title: 'modules/staking/avax/ConvertForm',
};
