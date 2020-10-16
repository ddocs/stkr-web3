import { IMicropoolListItemProps } from './components/MicropoolList/types';
import { IBeaconListItem } from './components/BeaconList/types';

export const MICRO_POOL_DATA: IMicropoolListItemProps[] = [
  {
    id: 1,
    name: 'Eth 2.0 Pool',
    status: 'Live',
    fee: 0.000315,
    total: 32,
    reward: 29.5,
  },
  {
    id: 1,
    name: 'Eth 2.0 Pool',
    status: 'Live',
    fee: 0.000315,
    total: 32,
    reward: 29,
  },
  {
    id: 1,
    name: 'Eth 2.0 Pool',
    status: 'Live',
    fee: 0.000315,
    total: 32,
    reward: 3.5,
  },
];

export const BEACON_NODE_DATA: IBeaconListItem[] = [
  {
    id: 1,
    name: 'Alex_Beacon_Node',
    uptime: '20 min ago',
    date: '30 Sep 2020 19:30',
  },
];
