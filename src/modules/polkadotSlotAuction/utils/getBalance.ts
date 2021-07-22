import { BalancesType } from '../hooks/useCrowdloans';

export const getBalance = (balances: BalancesType, loanId: number) => {
  let balanceResult = ``;
  const balance = balances[2003 || loanId]; // TODO change to balances[loanId]

  if (balance) {
    balanceResult = `${balance.total
      .plus(balance.onchain)
      .plus(balance.claimable)
      .toString(10)}`;
  }

  return balanceResult;
};
