import BigNumber from 'bignumber.js';
import { BlockchainNetworkId } from '../../common/types';
import { Address } from '../api/provider';

export interface IStakingEntry {
  stakingDate: string;
  action: string;
  transactionHash: string;
  transactionType: string;
  stakingAmount: BigNumber;
}

export interface IStakingHistory {
  data: IStakingEntry[];
}

export enum StakingStep {
  Stake = 'Stake',
  DepositAAvaxB = 'DepositAAvaxB',
  AwaitingSwitchNetwork = 'AwaitingSwitchNetwork',
  WithdrawalAAvaxB = 'WithdrawalAAvaxB',
  HoldExternalWallet = 'HoldExternalWallet',

  DepositAvax = 'DepositAvax',
  WithdrawAvax = 'WithdrawAvax',
  ClaimAvax = 'ClaimAvax',
}

interface IIWalletClaimAvax {
  step: StakingStep.ClaimAvax;
  amount: BigNumber;
}

interface IIWalletWithdrawAvax {
  step: StakingStep.WithdrawAvax;
  transactionHash: string;
  amount: BigNumber;
  network: BlockchainNetworkId;
  signature: string;
  recipient: Address;
}

export interface IIWalletStatusDepositAvax {
  step: StakingStep.DepositAvax;
  amount: BigNumber;
  network: BlockchainNetworkId;
}

export interface IIWalletStake {
  step: StakingStep.Stake;
  requiredNetwork: BlockchainNetworkId;
  currentNetwork: BlockchainNetworkId;
}

export interface IWalletAwaitingSwitchNetwork {
  step: StakingStep.AwaitingSwitchNetwork;
  requiredNetwork: BlockchainNetworkId;
  currentChainId: BlockchainNetworkId;
  isConnected: boolean;
  amount: BigNumber;
  recipient: Address;
  signature: string;
  txHash: string;
  from: Address;
}

export interface IWalletWithdrawalAAvaxB {
  step: StakingStep.WithdrawalAAvaxB;
  requiredNetwork: BlockchainNetworkId;
  currentChainId: BlockchainNetworkId;
  isConnected: boolean;
  amount: BigNumber;
  recipient: Address;
  signature: string;
  txHash: string;
  fromAddress: string;
}

export type IWalletStatus =
  | IIWalletStake
  | IWalletAwaitingSwitchNetwork
  | IWalletWithdrawalAAvaxB
  | IIWalletWithdrawAvax
  | IIWalletClaimAvax;

export interface IClaimAvalable {
  amount: BigNumber;
}

export interface IBalance {
  amount: BigNumber;
}
export interface IStakerStats {
  claimAvailable: BigNumber;
  balance: BigNumber;
  history: IStakingEntry[];
}

export interface IClaimStats {
  balance: BigNumber;
  history: IStakingEntry[];
}

export interface IClaimPayload {
  amount: number;
  address: string;
  network: number;
}

export interface IConvertPayload {
  amount: number;
  address: string;
}

export interface IConvertEstimates {
  amount: BigNumber;
  estimate: string;
  address: string;
}

export interface IAvaxStakingSession {
  nextStep: StakingStep;
  transactionHash?: string;
  amount?: string;
  signature?: string;
  network?: string;
  from?: string;
  recipient?: string;
  error?: string;
  inProgress?: boolean;
}
