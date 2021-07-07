import { useQuery } from '@redux-requests/react';
import { UserActionTypes } from '../../store/actions/UserActions';
import { IUserInfo, IStakingFeeInfo } from '../../store/apiMappers/userApi';
import { Blockchain } from '../types';

export function useFeaturesAvailable() {
  const { data: userInfo } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });
  const { data: stakingFeeInfo } = useQuery<IStakingFeeInfo | null>({
    type: UserActionTypes.CALC_STAKING_FEE,
  });

  const isSmartChain = userInfo?.blockchainType === Blockchain.binance;
  const isETHChain = userInfo?.blockchainType === Blockchain.ethereum;

  return {
    isProviderAvailable: isETHChain,
    isClaimAvailable: true,
    isAEthClaimAlwaysAvailable: true,
    isFethSupported: !isSmartChain,
    stakingAmountStep: isSmartChain ? 0.1 : 0.5,
    stakingFeeRate: stakingFeeInfo?.stakingFeeRate,
    isBnbStakingAvailable: !!window.BinanceChain,
    isEthStakingAvailable: isETHChain || isSmartChain,
  };
}
