import { IStakeHistoryItem } from '../../store/apiMappers/stakerStatsApi';
import BigNumber from 'bignumber.js';

export function getStakedAmount(items: IStakeHistoryItem[]) {
  return items.reduce((result, item) => {
    if (item.action === 'STAKE_ACTION_CONFIRMED') {
      return result.plus(item.amount);
    }

    return result;
  }, new BigNumber(0));
}
