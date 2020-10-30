import { IPool } from '../../store/apiMappers/poolsApi';
import BigNumber from 'bignumber.js';

export const MICRO_POOL_DATA: IPool[] = [
  {
    provider: '',
    period: 1,
    name: 'Eth 2.0 Pool',
    status: 'MICRO_POOL_STATUS_PENDING',
    fee: new BigNumber(0.000315),
    totalStake: new BigNumber(32),
    currentStake: new BigNumber(29.5),
    transactionHash: '',
    poolIndex: 1,
  },
  {
    provider: '',
    period: 2,
    name: 'Eth 2.0 Pool',
    status: 'MICRO_POOL_STATUS_PENDING',
    fee: new BigNumber(0.000315),
    totalStake: new BigNumber(32),
    currentStake: new BigNumber(29),
    transactionHash: '',
    poolIndex: 2,
  },
  {
    provider: '',
    period: 3,
    name: 'Eth 2.0 Pool',
    status: 'MICRO_POOL_STATUS_PENDING',
    fee: new BigNumber(0.000315),
    totalStake: new BigNumber(32),
    currentStake: new BigNumber(3.5),
    transactionHash: '',
    poolIndex: 3,
  },
];
