/* eslint-disable import/no-anonymous-default-export */
import BigNumber from 'bignumber.js';
import React from 'react';
import { PlusMinusBtn } from '../PlusMinusBtn';
import { ClaimComponent } from './ClaimComponent';

export default {
  title: 'modules/AvaxStaking/components/Claim',
};

export const Default = () => {
  const onClaimClick = () => {
    console.log('onClaimClick');
  };

  const isLoading = false;

  return (
    <ClaimComponent
      amount={new BigNumber('1.5512')}
      claimLoading={isLoading}
      onClaimClick={onClaimClick}
      stakeBtn={<PlusMinusBtn tooltip="Stake" icon="plus" />}
      unstakeBtn={<PlusMinusBtn tooltip="Unstake" icon="minus" />}
    />
  );
};
