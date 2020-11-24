import { GlobalStatsReply } from '../../modules/api/gateway';
import BigNumber from 'bignumber.js';

export interface IProviderStats {
  totalEthereumStaked: BigNumber;
  totalProviders: number;
  totalMicroPools: number;
  totalStakers: number;
  monthlyEarnings: BigNumber;
  yearlyEarnings: BigNumber;
}

export function mapProviderStats(item: GlobalStatsReply): IProviderStats {
  return {
    totalEthereumStaked: new BigNumber(item.totalEthereumStaked),
    totalProviders: item.totalProviders,
    totalMicroPools: item.totalMicroPools,
    totalStakers: item.totalStakers,
    monthlyEarnings: new BigNumber(item.monthlyEarnings),
    yearlyEarnings: new BigNumber(item.yearlyEarnings),
  };
}
