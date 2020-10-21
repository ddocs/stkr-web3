import BigNumber from 'bignumber.js';

export interface IAllowance {
  allowanceAmount: BigNumber;
  remainingAllowance: BigNumber;
}

export interface IAllowTokensResponse {
  txHash: string;
}
