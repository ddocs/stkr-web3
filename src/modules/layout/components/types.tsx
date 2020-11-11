export interface ITab<T = string> {
  label: string;
  value?: T;
  href: string;
  disabled?: true;
}

export enum NavTab {
  staker = 'staker',
  provider = 'provider',
}
