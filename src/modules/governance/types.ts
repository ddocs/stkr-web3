import {
  ContractEvent,
  Proposal,
  ProposalStatus,
  Propose,
} from '@ankr.com/stkr-jssdk';

export interface IProject {
  topic: string;
  content: string;
  id: string;
  yes: number;
  no: number;
  startTime: Date;
  endTime: Date;
  status: ProposalStatus;
}

export function mapProject({
  projects,
  data,
}: {
  projects: ContractEvent<Propose>[];
  data: Proposal[];
}): IProject[] {
  return projects.map((item, index) => {
    return {
      topic: item.returnValues.topic,
      content: item.returnValues.content,
      id: item.returnValues.proposeID,
      yes: Number(data[index].yes),
      no: Number(data[index].no),
      startTime: new Date(parseInt(data[index].startTime, 10) * 1000),
      endTime: new Date(parseInt(data[index].endTime, 10) * 1000),
      status: data[index].status,
    };
  });
}
