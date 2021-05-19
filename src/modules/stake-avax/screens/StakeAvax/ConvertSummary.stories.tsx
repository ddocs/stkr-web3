import React from 'react';
import { ConvertSummary } from '../../components/ConvertSummary';

const ConvertSummaryStory = () => {
  return <ConvertSummary onSubmit={() => null} onCancel={() => null} />;
};

export const ConvertSummaryExample = () => <ConvertSummaryStory />;

export default {
  title: 'modules/staking/avax/convert-summary',
};
