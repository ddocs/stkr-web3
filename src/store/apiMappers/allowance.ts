import BigNumber from 'bignumber.js';

export interface IAllowance {
  allowanceAmount: BigNumber;
  remainingAllowance: BigNumber;
  totalAllowance: BigNumber;
}

export interface IAllowTokensResponse {
  txHash: string;
}
