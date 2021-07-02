import { WithStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import { Action } from 'redux-actions';

export interface IEmailPayload {
  email: string;
}

export enum Provider {
  metamask = 'metamask',
  wallet = 'wallet',
  binance = 'binance',
}

export enum Blockchain {
  ethereum = 'ethereum',
  binance = 'binance',
  avalanche = 'avalanche',
}

export interface IRequestActionPromiseData<T = any, D = any, E = any> {
  action: Action<T>;
  data: D;
  error: E;
  isAborted: boolean;
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

export enum BlockchainNetworkId {
  mainnet = 1,
  ropsten = 3,
  rinkeby = 4,
  goerli = 5,
  dev = 2018,
  classic = 61,
  mordor = 63,
  kotti = 6,
  smartchain = 56,
  smartchainTestnet = 97,
  avalanche = 43114,
  avalancheTestnet = 43113,
}

export const SupportedBlockchainNetworkId = [1, 5, 56, 97, 43114, 43113];
