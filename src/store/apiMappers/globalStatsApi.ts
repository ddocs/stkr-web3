import { GlobalStatsReply } from '../../modules/api/gateway';
import BigNumber from 'bignumber.js';

export interface IGlobalStats {
  activePoolCount: number;
  activeSidecarCount: number;
  pendingEthereum: BigNumber;
  replicationFactor: number;
  totalProviders: number;
  totalStakedEthereum: BigNumber;
  totalStakers: number;
  validatorCount: number;
}

export function mapGlobalStats(item: GlobalStatsReply): IGlobalStats {
  return {
    ...item,
    pendingEthereum: new BigNumber(item.pendingEthereum),
    totalStakedEthereum: new BigNumber(item.totalStakedEthereum),
  };
}
