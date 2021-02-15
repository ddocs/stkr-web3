import { useQuery } from '@redux-requests/react';
import { UserActionTypes } from '../../store/actions/UserActions';
import { IUserInfo } from '../../store/apiMappers/userApi';
import { Blockchain } from '../types';

export function useFeaturesAvailable() {
  const { data } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  return {
    isClaimAvailable: data?.blockchainType !== Blockchain.binance,
  };
}
