import { useQuery } from '@redux-requests/react';
import {
  ISidecarsQuery,
  QueryStatus,
  UserActionTypes,
} from '../../../store/actions/UserActions';

export const useSidecarsQuery = () => {
  const { data, loading, error } = useQuery<ISidecarsQuery | null>({
    type: UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS,
  });

  const isAllLoaded = data?.status === QueryStatus.done;

  return {
    page: data?.page || 0,
    data: data?.items,
    loading,
    error,
    isAllLoaded,
  };
};
