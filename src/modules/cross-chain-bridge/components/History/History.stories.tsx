/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { History, ITxnHistory } from './History';

export default {
  title: 'modules/CrossChainBridge/components/History',
};

const items: ITxnHistory[] = [
  {
    from: {
      icon: 'binance',
      address: '0xaa25Aa7a19f9c426E07dee59b12f944f4d9f1DD3',
    },
    to: {
      icon: 'eth',
      address: '0x0Ffef93Fcba21e53E8d5C8b2ca68D64BAA29c915',
    },
    amount: 0.66,
    amountType: 'aETH',
    date: new Date(),
    isReady: true,
  },
  {
    from: {
      icon: 'eth',
      address: '0x0Ffef93Fcba21e53E8d5C8b2ca68D64BAA29c915',
    },
    to: {
      icon: 'binance',
      address: '0xaa25Aa7a19f9c426E07dee59b12f944f4d9f1DD3',
    },
    amount: 5,
    amountType: 'aETH',
    date: new Date(),
    isReady: false,
  },
];

export const Default = () => {
  const onClick = () => {
    console.log('test');
  };
  return (
    <Curtains>
      <History onClick={onClick} items={items} />
    </Curtains>
  );
};
