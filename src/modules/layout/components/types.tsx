export interface ITab<T = string> {
  label: string;
  value?: T;
  href: string;
}

export enum NavTab {
  staker = 'staker',
  provider = 'provider',
}
