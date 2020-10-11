import React from 'react';
import { ITablesRowProps } from '../../../../components/TableComponents/types';
import { Total as RangeTotal } from '../../../../components/Total';
import { ITotalProps } from '../../../../components/Total/Total';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';

const Total = (props: ITotalProps) => (
  <RangeTotal {...props}>
    <Button variant="text" size="medium" color="secondary">
      {t('navigation.edit')}
    </Button>
  </RangeTotal>
);

export const MICRO_POOL_DATA: ITablesRowProps[] = [
  {
    data: {
      name: 'Eth 2.0 Pool',
      status: 'Live',
      fee: '0.5 ETH',
      duration: '2 mo',
      total: <Total total={32} reward={29.5} />,
    },
  },
  {
    data: {
      name: 'Eth 2.0 Pool',
      status: 'Live',
      fee: '0.5 ETH',
      duration: '2 mo',
      total: <Total total={32} reward={29} />,
    },
  },
  {
    data: {
      name: 'Eth 2.0 Pool',
      status: 'Live',
      fee: '0.5 ETH',
      duration: '2 mo',
      total: <Total total={32} reward={3.5} />,
    },
  },
];
