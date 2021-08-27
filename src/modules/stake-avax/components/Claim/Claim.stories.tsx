/* eslint-disable import/no-anonymous-default-export */
import BigNumber from 'bignumber.js';
import React from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { ClaimComponent } from './ClaimComponent';

export default {
  title: 'modules/AvaxStaking/components/Claim',
};

export const Default = () => {
  const onClaimClick = () => {
    console.log('onClaimClick');
  };
  const onUnstakeClick = () => {
    console.log('onClaimClick');
  };

  const isLoading = false;

  return (
    <section>
      <Curtains>
        <ClaimComponent
          amount={new BigNumber('1.5512')}
          claimLoading={isLoading}
          onClaimClick={onClaimClick}
          onUnstakeClick={onUnstakeClick}
        />
      </Curtains>
    </section>
  );
};
