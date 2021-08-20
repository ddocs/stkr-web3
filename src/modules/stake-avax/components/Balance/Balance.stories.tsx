/* eslint-disable import/no-anonymous-default-export */
import BigNumber from 'bignumber.js';
import React from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { BalanceComponent } from './BalanceComponent';

export default {
  title: 'modules/AvaxStaking/components/Balance',
};

export const Default = () => {
  return (
    <section>
      <Curtains>
        <BalanceComponent amount={new BigNumber('1.5512')} />
      </Curtains>
    </section>
  );
};
