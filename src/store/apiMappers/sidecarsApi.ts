import { SidecarReply, SidecarStatus } from '../../modules/api/gateway';

export interface ISidecar {
  id: string;
  provider: string;
  status: SidecarStatus;
  machine?: any;
  beaconChain?: any;
  created: Date;
}

export function mapSidecar(item: SidecarReply): ISidecar {
  return {
    id: item.id,
    provider: item.provider,
    status: item.status,
    machine: item.machine,
    beaconChain: item.beaconChain,
    created: new Date(item.created),
  };
}
