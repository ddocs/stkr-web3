import { Total as RangeTotal } from '../../../../components/Total';
import React from 'react';
import { ITablesRowProps } from '../../../../components/TableComponents/types';
import { ITotalStoreProps } from '../../../../components/Total/Total';
import { NavLink } from '../../../../UiKit/Link';
import { INDEX_PATH } from '../../../../common/const';
import { t } from '../../../../common/utils/intl';

const Total = (props: ITotalStoreProps) => (
  <RangeTotal {...props}>
    <NavLink
      style={{ minWidth: 100 }}
      href={INDEX_PATH}
      variant="outlined"
      size="large"
      color="primary"
    >
      {t('navigation.join')}
    </NavLink>
  </RangeTotal>
);

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
