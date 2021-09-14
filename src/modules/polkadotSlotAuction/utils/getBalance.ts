import { BalancesType } from '../hooks/useCrowdloans';
import { DEFAULT_FIXED } from '../../../common/const';

export const getBalance = (balances: BalancesType, loanId: number) => {
  let balanceResult = ``;
  const balance = balances[loanId];

  if (balance) {
    balanceResult = `${balance.total
      .plus(balance.onchain)
      .plus(balance.claimable)
      .decimalPlaces(DEFAULT_FIXED)
      .toString(10)}`;
  }

  return balanceResult;
};
