import React from 'react';
import { Amount } from './Amount';

const AmountStory = () => {
  return <Amount value="555" unit="ETH" />;
};

export const AmountExample = () => <AmountStory />;

export default {
  title: 'components/Amount',
};
