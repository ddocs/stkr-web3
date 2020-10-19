import { SidecarReply, SidecarStatus } from '../../modules/api/gateway';
import { differenceInCalendarMonths } from 'date-fns';

export interface ISidecar {
  id: string;
  period: number;
  created: Date;
  status: SidecarStatus;
}

export function mapSidecar(item: SidecarReply): ISidecar {
  return {
    id: item.id,
    period: differenceInCalendarMonths(new Date().getTime(), item.activated),
    created: new Date(item.created),
    status: item.status,

  };
}
