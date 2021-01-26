import { WithStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import { Action } from 'redux-actions';

export interface IEmailPayload {
  email: string;
}

export enum Providers {
  metamask = 'metamask',
  wallet = 'wallet',
}

export interface IRequestActionPromiseData<T = any> {
  action: Action<T>;
}

export type Seconds = number;
export type Milliseconds = number;
export type Megabytes = number;
export type Percentage = number;
export type ETH = number;

export enum DepositType {
  ETH = 'ETH',
  ANKR = 'ANKR',
}

// TODO
export type WithUseStyles<
  USE_STYLES extends (props?: any) => ClassNameMap<string>
> = WithStyles<{ [key in keyof ReturnType<USE_STYLES>]?: any }>;

export enum Locale {
  en = 'en-US',
  zh = 'zh-CN',
}
