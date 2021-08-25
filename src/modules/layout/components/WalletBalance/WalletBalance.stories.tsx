import BigNumber from 'bignumber.js';
import React from 'react';
import { WalletBalance } from './WalletBalance';

const DefaultStory = () => {
  return <WalletBalance eth={new BigNumber(23)} ankr={new BigNumber(10500)} />;
};

export const Default = () => <DefaultStory />;

export default {
  title: 'modules/Layout/components/WalletBalance',
};
