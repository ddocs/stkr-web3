import React from 'react';
import { MicropoolListTotal } from './MicropoolListTotal';
import { IMicropoolListItemProps } from './types';
import { ITablesRowProps } from '../../../../components/TableComponents/types';

export const MICRO_POOL_DATA: ITablesRowProps[] = [
  {
    data: {
      name: 'Eth 2.0 Pool',
      status: 'Live',
      fee: '0.5 ETH',
      total: (
        <MicropoolListTotal
          total={32}
          reward={29.5}
          onChange={() => null}
          reference={{} as IMicropoolListItemProps}
        />
      ),
    },
  },
  {
    data: {
      name: 'Eth 2.0 Pool',
      status: 'Live',
      fee: '0.5 ETH',
      total: (
        <MicropoolListTotal
          total={32}
          reward={29}
          onChange={() => null}
          reference={{} as IMicropoolListItemProps}
        />
      ),
    },
  },
  {
    data: {
      name: 'Eth 2.0 Pool',
      status: 'Live',
      fee: '0.5 ETH',
      total: (
        <MicropoolListTotal
          total={32}
          reward={3.5}
          onChange={() => null}
          reference={{} as IMicropoolListItemProps}
        />
      ),
    },
  },
];
