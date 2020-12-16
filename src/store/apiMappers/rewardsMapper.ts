import { IProviderRewardsReply } from '../../modules/api/gateway';
import BigNumber from 'bignumber.js';

export interface IProviderRewards {
  globalRatio: number;
  rewards: BigNumber;
}

export function mapProviderRewards(
  item: IProviderRewardsReply,
): IProviderRewards {
  return {
    globalRatio: item.globalRatio,
    rewards: new BigNumber(item.rewards),
  };
}
