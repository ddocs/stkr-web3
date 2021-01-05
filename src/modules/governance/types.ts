import { ContractEvent, Propose } from '@ankr.com/stkr-jssdk';

export interface IProject {
  topic: string;
  content: string;
  id: string;
  yes?: number;
  no?: number;
}

export function mapProject(data: {
  projects: ContractEvent<Propose>[];
}): IProject[] {
  return data.projects.map(item => {
    return {
      topic: item.returnValues.topic,
      content: item.returnValues.content,
      id: item.returnValues.proposeID,
    };
  });
}
