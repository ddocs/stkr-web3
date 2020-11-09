import { Address, ProviderRpcError } from './provider';
import BigNumber from 'bignumber.js';
import { EventData } from 'web3-eth-contract';
import { EventLog } from 'web3-core';

export enum KeyProviderEvents {
  AccountChanged = 'AccountChanged',
  Disconnect = 'Disconnect',
  Message = 'Message',
  ChainChanged = 'ChainChanged',
}

export interface IKeyProviderAccountChangedEvent {
  type: KeyProviderEvents.AccountChanged;
  data: {
    accounts: Address[];
  };
}

export interface IKeyProviderDisconnectEvent {
  type: KeyProviderEvents.Disconnect;
  error: ProviderRpcError;
}

export interface IKeyProviderMessageEvent {
  type: KeyProviderEvents.Message;
  data: any;
}

export interface IKeyProviderChainChangedEvent {
  type: KeyProviderEvents.ChainChanged;
  data: { chainId: string };
}

export type KeyProviderEvent =
  | IKeyProviderAccountChangedEvent
  | IKeyProviderDisconnectEvent
  | IKeyProviderMessageEvent
  | IKeyProviderChainChangedEvent;

export enum ContractManagerEvents {
  StakePending = 'StakePending', // !
  StakeConfirmed = 'StakeConfirmed', // !
  StakeRemoved = 'StakeRemoved', // !
  PoolOnGoing = 'PoolOnGoing',
  PoolCompleted = 'PoolCompleted',
  ProviderSlashedAnkr = 'ProviderSlashedAnkr',
  ProviderSlashedEth = 'ProviderSlashedEth',
  ProviderToppedUpEth = 'ProviderToppedUpEth',
  ProviderToppedUpAnkr = 'ProviderToppedUpAnkr',
  ProviderExited = 'ProviderExited',
  RewardClaimed = 'RewardClaimed',
}

export interface IEventLog {
  transactionHash: string;
}

export interface IContractManagerStakePending {
  type: ContractManagerEvents.StakePending;
  data: {
    eventData: IEventLog;
    staker: Address;
    amount: BigNumber;
  };
}

export interface IContractManagerStakeConfirmed {
  type: ContractManagerEvents.StakeConfirmed;
  data: {
    eventData: IEventLog;
    staker: Address;
    amount: BigNumber;
  };
}

export interface IContractManagerStakeRemoved {
  type: ContractManagerEvents.StakeRemoved;
  data: {
    eventData: IEventLog;
    staker: Address;
    amount: BigNumber;
  };
}

export interface IContractManagerPoolOnGoing {
  type: ContractManagerEvents.PoolOnGoing;
  data: {
    eventData: IEventLog;
    pool: string;
  };
}

export interface IContractManagerPoolCompleted {
  type: ContractManagerEvents.PoolCompleted;
  data: {
    eventData: IEventLog;
    pool: string;
  };
}

export interface IContractManagerProviderSlashedAnkr {
  type: ContractManagerEvents.ProviderSlashedAnkr;
  data: {
    eventData: IEventLog;
    provider: Address;
    etherEquivalence: BigNumber;
    ankrAmount: BigNumber;
  };
}

export interface IContractManagerProviderSlashedEth {
  type: ContractManagerEvents.ProviderSlashedEth;
  data: {
    eventData: IEventLog;
    provider: Address;
    etherAmount: BigNumber;
  };
}

export interface IContractManagerProviderToppedUpEth {
  type: ContractManagerEvents.ProviderToppedUpEth;
  data: {
    eventData: IEventLog;
    provider: Address;
    amount: BigNumber;
  };
}

export interface IContractManagerProviderToppedUpAnkr {
  type: ContractManagerEvents.ProviderToppedUpAnkr;
  data: {
    eventData: IEventLog;
    provider: Address;
    amount: BigNumber;
  };
}

export interface IContractManagerProviderExited {
  type: ContractManagerEvents.ProviderExited;
  data: {
    eventData: IEventLog;
    provider: Address;
  };
}

export interface IContractManagerRewardClaimed {
  type: ContractManagerEvents.RewardClaimed;
  data: {
    eventData: IEventLog;
    staker: Address;
    amount: BigNumber;
  };
}

export type ContractManagerEvent =
  | IContractManagerStakePending
  | IContractManagerStakeConfirmed
  | IContractManagerStakeRemoved
  | IContractManagerPoolOnGoing
  | IContractManagerPoolCompleted
  | IContractManagerProviderSlashedAnkr
  | IContractManagerProviderSlashedEth
  | IContractManagerProviderToppedUpEth
  | IContractManagerProviderToppedUpAnkr
  | IContractManagerProviderExited
  | IContractManagerRewardClaimed;
