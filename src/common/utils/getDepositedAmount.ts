import { IStakeHistoryItem } from '../../store/apiMappers/stakerStatsApi';
import BigNumber from 'bignumber.js';

export function getDepositedAmount(items: IStakeHistoryItem[]) {
  return items.reduce((result, item) => {
    if (item.action === 'STAKE_ACTION_PENDING') {
      return result.plus(item.amount);
    } else if (item.action === 'STAKE_ACTION_UNSTAKE') {
      return result.minus(item.amount);
    }

    return result;
  }, new BigNumber(0));
}
