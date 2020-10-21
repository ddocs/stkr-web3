import { Action } from 'redux-actions';

export interface IEmailPayload {
  email: string;
}

export enum Providers {
  metamask = 'metamask',
  wallet = 'wallet',
}

export interface IReduxRequestActionResponse<T = any> {
  action: Action<T>;
}
