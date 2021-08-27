import BigNumber from 'bignumber.js';
import { BlockchainNetworkId } from '../../../common/types';
import { Address } from '../../api/provider';

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
  amount: BigNumber;
  depositAmount: BigNumber;
  recipient: Address;
  signature: string;
  txHash: string;
  fromAddress: Address;
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

export interface IHoldExternalWallet {
  step: StakingStep.HoldExternalWallet;
}

export type IWalletStatus =
  | IIWalletStake
  | IWalletAwaitingSwitchNetwork
  | IWalletWithdrawalAAvaxB
  | IHoldExternalWallet;

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
  amount: string;
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
