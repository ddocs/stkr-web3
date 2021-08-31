import { Address, ProviderRpcError } from './provider';
import BigNumber from 'bignumber.js';

export enum KeyProviderEvents {
  AccountChanged = 'AccountChanged',
  Disconnect = 'Disconnect',
  Message = 'Message',
  ChainChanged = 'ChainChanged',
}

export interface IAccountChangedEvent {
  type: KeyProviderEvents.AccountChanged;
  data: {
    accounts: Address[];
  };
}

export interface IDisconnectEvent {
  type: KeyProviderEvents.Disconnect;
  error: ProviderRpcError;
}

export interface IMessageEvent {
  type: KeyProviderEvents.Message;
  data: any;
}

export interface IChainChangedEvent {
  type: KeyProviderEvents.ChainChanged;
  data: { chainId: string };
}

export type KeyProviderEvent =
  | IAccountChangedEvent
  | IDisconnectEvent
  | IMessageEvent
  | IChainChangedEvent;

export enum ContractManagerEvents {
  AnkrBalanceChanged = 'AnkrBalanceChanged',
  EthereumBalanceChanged = 'EthereumBalanceChanged',
  AethBalanceChanged = 'AethBalanceChanged',
  StakePending = 'StakePending', // !
  StakeConfirmed = 'StakeConfirmed', // !
  PoolOnGoing = 'PoolOnGoing',
  PoolCompleted = 'PoolCompleted',
  ProviderSlashedAnkr = 'ProviderSlashedAnkr',
  ProviderSlashedEth = 'ProviderSlashedEth',
  ProviderToppedUpEth = 'ProviderToppedUpEth',
  ProviderToppedUpAnkr = 'ProviderToppedUpAnkr',
  ProviderExited = 'ProviderExited',
  RewardClaimed = 'RewardClaimed',
  AnkrDepositAllowed = 'AnkrDepositAllowed',
  AnkrClaimed = 'AnkrClaimed',
}

export enum AvalanchePoolEvents {
  StakePending = 'StakePending',
  AllEvents = 'allEvents',
}

export interface IEventLog {
  transactionHash: string;
  blockNumber: number;
}

export interface IAnkrBalanceChangedEvent {
  type: ContractManagerEvents.AnkrBalanceChanged;
  data: {
    eventLog: IEventLog;
    address: Address;
    balance: BigNumber;
    delta: BigNumber;
  };
}

export interface IEthereumBalanceChangedEvent {
  type: ContractManagerEvents.EthereumBalanceChanged;
  data: {
    eventLog: IEventLog;
    address: Address;
    balance: BigNumber;
  };
}

export interface IAethBalanceChangedEvent {
  type: ContractManagerEvents.AethBalanceChanged;
  data: {
    eventLog: IEventLog;
    address: Address;
    balance: BigNumber;
    delta: BigNumber;
  };
}

export interface IStakePendingEvent {
  type: ContractManagerEvents.StakePending;
  data: {
    eventLog: IEventLog;
    staker: Address;
    amount: BigNumber;
  };
}

export interface IStakeConfirmedEvent {
  type: ContractManagerEvents.StakeConfirmed;
  data: {
    eventLog: IEventLog;
    staker: Address;
    amount: BigNumber;
  };
}

export interface IPoolOnGoingEvent {
  type: ContractManagerEvents.PoolOnGoing;
  data: {
    eventLog: IEventLog;
    pool: string;
  };
}

export interface IPoolCompletedEvent {
  type: ContractManagerEvents.PoolCompleted;
  data: {
    eventLog: IEventLog;
    pool: string;
  };
}

export interface IProviderSlashedAnkrEvent {
  type: ContractManagerEvents.ProviderSlashedAnkr;
  data: {
    eventLog: IEventLog;
    provider: Address;
    etherEquivalence: BigNumber;
    ankrAmount: BigNumber;
  };
}

export interface IProviderSlashedEthEvent {
  type: ContractManagerEvents.ProviderSlashedEth;
  data: {
    eventLog: IEventLog;
    provider: Address;
    etherAmount: BigNumber;
  };
}

export interface IProviderToppedUpEthEvent {
  type: ContractManagerEvents.ProviderToppedUpEth;
  data: {
    eventLog: IEventLog;
    provider: Address;
    amount: BigNumber;
  };
}

export interface IProviderToppedUpAnkrEvent {
  type: ContractManagerEvents.ProviderToppedUpAnkr;
  data: {
    eventLog: IEventLog;
    provider: Address;
    amount: BigNumber;
  };
}

export interface IProviderExitedEvent {
  type: ContractManagerEvents.ProviderExited;
  data: {
    eventLog: IEventLog;
    provider: Address;
  };
}

export interface IRewardClaimedEvent {
  type: ContractManagerEvents.RewardClaimed;
  data: {
    eventLog: IEventLog;
    staker: Address;
    amount: BigNumber;
  };
}

export type ContractManagerEvent =
  | IStakePendingEvent
  | IStakeConfirmedEvent
  | IPoolOnGoingEvent
  | IPoolCompletedEvent
  | IProviderSlashedAnkrEvent
  | IProviderSlashedEthEvent
  | IProviderToppedUpEthEvent
  | IProviderToppedUpAnkrEvent
  | IProviderExitedEvent
  | IRewardClaimedEvent;
