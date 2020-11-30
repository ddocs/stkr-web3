import { GlobalStatsReply } from '../../modules/api/gateway';
import BigNumber from 'bignumber.js';
import { ETH_SCALE_FACTOR } from '../../common/const';

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
    pendingEthereum: new BigNumber(
      new BigNumber(item.pendingEthereum).div(ETH_SCALE_FACTOR).toFixed(1),
    ),
    totalStakedEthereum: new BigNumber(item.totalStakedEthereum),
  };
}
