import { Total } from './Total';
import React from 'react';
import { ITablesRowProps } from '../../../../components/TableComponents/types';

export const POOL_DATA: ITablesRowProps[] = [
  {
    data: {
      name: 'Ankr Pool 3',
      provider: 'Ankr',
      status: 'Pending',
      fee: '10 USDT',
      total: <Total total={12} reward={0} />,
    },
  },
  {
    data: {
      name: 'Ankr Pool 2',
      provider: 'Ankr',
      status: 'Pending',
      fee: '10 USDT',
      total: <Total total={30} reward={0} />,
    },
  },
  {
    data: {
      name: 'Ankr Pool 1',
      provider: 'Ankr',
      status: 'Ongoing',
      fee: '10 USDT',
      total: <Total total={32} reward={1} />,
    },
  },
  {
    data: {
      name: 'Ankr Pool 1',
      provider: 'Ankr',
      status: 'Ongoing',
      fee: '10 USDT',
      total: <Total total={32} reward={1} />,
    },
  },
];
