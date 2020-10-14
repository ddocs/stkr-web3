import React from 'react';
import { ITablesRowProps } from '../../../../components/TableComponents/types';
import { Button } from '../../../../UiKit/Button';
import { t } from '../../../../common/utils/intl';

export const BEACON_NODE_DATA: ITablesRowProps[] = [
  {
    data: {
      name: 'Alex_Beacon_Node',
      uptime: '20 min ago',
      date: '30 Sep 2020 19:30',
      certificate: <Button>{t('navigation.download')}</Button>,
    },
  },
];
