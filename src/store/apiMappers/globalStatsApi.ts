import BigNumber from 'bignumber.js';
import { ETH_SCALE_FACTOR } from '../../common/const';
import { IGlobalStatsReply } from '../../modules/api/gateway';

export interface IGlobalStats {
  activePoolCount: number;
  activeSidecarCount: number;
  pendingEthereum: BigNumber;
  replicationFactor: number;
  totalProviders: number;
  totalStakedEthereum: BigNumber;
  totalStakers: number;
  validatorCount: number;
  currentApr?: number;
  ethereumPrice?: number;
}

export function mapGlobalStats(item: IGlobalStatsReply): IGlobalStats {
  return {
    ...item,
    pendingEthereum: new BigNumber(
      new BigNumber(item.pendingEthereum).div(ETH_SCALE_FACTOR).toFixed(1),
    ),
    totalStakedEthereum: new BigNumber(item.totalStakedEthereum),
  };
}
