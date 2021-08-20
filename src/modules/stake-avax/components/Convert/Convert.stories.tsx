/* eslint-disable import/no-anonymous-default-export */
import BigNumber from 'bignumber.js';
import React from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { ConvertComponent } from './ConvertComponent';

export default {
  title: 'modules/AvaxStaking/components/Convert',
};

export const Default = () => {
  const onClick = () => {
    console.log('onClick');
  };

  const isLoading = false;

  return (
    <section>
      <Curtains>
        <ConvertComponent
          amount={new BigNumber(2)}
          onClick={onClick}
          isLoading={isLoading}
        />
      </Curtains>
    </section>
  );
};
