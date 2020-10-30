import { Megabytes, Percentage } from '../../common/types';
import { SidecarStatusReply } from '../../modules/api/gateway';

interface IMachine {
  hostId: string;
  platform: 'SIDECAR_PLATFORM_DARWIN' | 'SIDECAR_PLATFORM_LINUX';
  arch: 'SIDECAR_ARCH_AMD64';
  machineUptime: Date;
  currentTime: Date;
  totalMemory: Megabytes;
  freeMemory: Megabytes;
  totalDisk: Megabytes;
  freeDisk: Megabytes;
  numberOfCores: number;
  cpuModel: string;
  cpuUsage: Percentage[];
  cpuSpeed: number;
  hostPlatform: '';
}

interface IChain {
  currentSlot: number;
  latestSlot: number;
  currentEpoch: number;
  latestEpoch: number;
  peerCount: number;
  syncing: boolean;
}

export interface ISidecarStatus {
  machine: IMachine;
  chain: IChain;
}

export function mapNodeStatus(payload: SidecarStatusReply): ISidecarStatus {
  return {
    machine: {
      ...payload.machine,
      machineUptime: new Date(payload.machine.machineUptime),
      currentTime: new Date(payload.machine.currentTime),
    },
    chain: payload.beaconChain,
  };
}
