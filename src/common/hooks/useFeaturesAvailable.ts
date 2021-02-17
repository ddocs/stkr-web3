import { useQuery } from '@redux-requests/react';
import { UserActionTypes } from '../../store/actions/UserActions';
import { IUserInfo } from '../../store/apiMappers/userApi';
import { Blockchain } from '../types';

export function useFeaturesAvailable() {
  const { data } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  const isSmartChain = data?.blockchainType === Blockchain.binance;

  return {
    isProviderAvailable: !isSmartChain,
    isClaimAvailable: !isSmartChain,
    stakingAmountStep: isSmartChain ? 0.1 : 0.5,
    stakingFeeRate: data?.stakingFeeRate,
  };
}
