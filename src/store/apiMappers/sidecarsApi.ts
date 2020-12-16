import { SidecarReply, SidecarStatus } from '../../modules/api/gateway';
import { Megabytes, Percentage, Seconds } from '../../common/types';
import BigNumber from 'bignumber.js';

export interface ISidecarMachine {
  host: string;
  platform:
    | 'MACHINE_PLATFORM_UNKNOWN'
    | 'MACHINE_PLATFORM_WINDOWS_X86'
    | 'MACHINE_PLATFORM_WINDOWS_AMD64'
    | 'MACHINE_PLATFORM_LINUX_X86'
    | 'MACHINE_PLATFORM_LINUX_AMD64'
    | 'MACHINE_PLATFORM_DARWIN_X86'
    | 'MACHINE_PLATFORM_DARWIN_AMD64';
  machineUptime: Seconds;
  currentTime: Seconds;
  totalMemory: Megabytes;
  freeMemory: Megabytes;
  totalDisk: Megabytes;
  freeDisk: Megabytes;
  numberOfCores: number;
  cpuModel: string;
  cpuUsage: Percentage[];
  cpuSpeed: number;
}

export interface ISidecarBeaconChain {
  currentSlot: number;
  latestSlot: number;
  currentEpoch: number;
  latestEpoch: number;
  peerCount: number;
  syncing: boolean;
}

export interface ISidecar {
  id: string;
  provider: string;
  name?: string;
  status: SidecarStatus;
  machine?: ISidecarMachine;
  beaconChain?: ISidecarBeaconChain;
  shareRatio: number;
  shareEth: BigNumber;
  created: Date;
}

export function mapSidecar(item: SidecarReply): ISidecar {
  return {
    id: item.id,
    provider: item.provider,
    name: item.name,
    status: item.status,
    machine: item.machine,
    beaconChain: item.beaconChain,
    shareRatio: item.shareRatio,
    shareEth: new BigNumber(item.shareEth),
    created: new Date(item.created * 1000),
  };
}
