import BigNumber from 'bignumber.js';

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

export interface IWalletStatus {
  step: StakingStep;
  isConnected: boolean;
  requiredNetwork: string;
}

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

export enum StakingStep {
  Stake,
  DepositAAvaxB,
  NotarizeAAvaxB,
  WithdrawAAvaxB,
  DepositAvax,
  NotarizeAvax,
  WithdrawAvax,
  ClaimAvax,
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
  address?: string;
  error?: string;
  inProgress?: boolean;
}
