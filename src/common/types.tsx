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
