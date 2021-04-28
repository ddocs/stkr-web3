import { useQuery } from '@redux-requests/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthentication } from '../../../common/utils/useAuthentications';
import {
  UserActions,
  UserActionTypes,
} from '../../../store/actions/UserActions';
import { IStakerStats } from '../../../store/apiMappers/stakerStatsApi';

export const useStakerStats = () => {
  const dispatch = useDispatch();
  const { isConnected } = useAuthentication();
  const { data, loading, pristine } = useQuery<IStakerStats | null>({
    type: UserActionTypes.FETCH_STAKER_STATS,
  });

  useEffect(() => {
    if (isConnected && pristine) {
      dispatch(UserActions.fetchStakerStats());
    }
  }, [dispatch, isConnected, pristine]);

  return {
    stakerStats: data,
    stakerStatsLoading: loading,
  };
};
