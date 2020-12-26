import { IStakeHistoryItem } from '../../store/apiMappers/stakerStatsApi';
import BigNumber from 'bignumber.js';
import { getStakedAmount } from './getStakedAmount';
import { getDepositedAmount } from './getDepositedAmount';

export function getPendingAmount(
  items: IStakeHistoryItem[],
  staked?: BigNumber,
) {
  const stakedAmount = staked || getStakedAmount(items);
  const deposited = getDepositedAmount(items);
  return deposited.minus(stakedAmount);
}
