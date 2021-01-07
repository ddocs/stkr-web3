import { IProject } from '../types';

export function getProject(projects: IProject[], id: string) {
  return projects.find(item => item.id === id);
}
