import { GlobalStatsReply } from '../../modules/api/gateway';

export interface IProviderStats {
  activePoolCount: number;
  validatorCount: number;
  activeSidecarCount: number;
  safeReplicationFactor: number;
  replicationRate: number;
  replicationFactor: number;
}

export function mapProviderStats(item: GlobalStatsReply): IProviderStats {
  return item;
}
