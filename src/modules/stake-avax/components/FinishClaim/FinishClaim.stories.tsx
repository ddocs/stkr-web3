/* eslint-disable import/no-anonymous-default-export */
import BigNumber from 'bignumber.js';
import React from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { FinishClaimComponent } from './FinishClaimComponent';

export default {
  title: 'modules/AvaxStaking/components/FinishClaim',
};

export const Default = () => {
  const onClick = () => {
    console.log('onClick');
  };

  const isLoading = false;

  return (
    <section>
      <Curtains>
        <FinishClaimComponent
          amount={new BigNumber(2)}
          onClick={onClick}
          isLoading={isLoading}
        />
      </Curtains>
    </section>
  );
};
