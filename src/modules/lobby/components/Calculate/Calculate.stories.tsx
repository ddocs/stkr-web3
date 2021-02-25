import BigNumber from 'bignumber.js';
import React from 'react';
import { STAKER_RATE } from '../../../../common/const';
import { CalculateComponent } from './Calculate';

const ethPrice = 1400;
const annualExpectedYearning = 0.15;
const yearlyEarning = annualExpectedYearning * STAKER_RATE;

const CalculateStory = () => {
  const onClick = () => {
    console.log('click');
  };

  return (
    <CalculateComponent
      isConnected={false}
      onUnlockWalletClick={onClick}
      ethPrice={new BigNumber(ethPrice)}
      currentApr={yearlyEarning}
    />
  );
};

export const CalculateExample = () => <CalculateStory />;

export default {
  title: 'modules/Lobby/component/Calculate',
};
