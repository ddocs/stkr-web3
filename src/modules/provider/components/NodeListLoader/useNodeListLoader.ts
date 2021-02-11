import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import { UserActions } from '../../../../store/actions/UserActions';
import { SIDECARS_PER_PAGE } from '../../const';
import { useSidecarsQuery } from '../../hooks/useSidecarsQuery';

export const useNodeListLoader = () => {
  const { isConnected } = useAuthentication();
  const { loading, isAllLoaded, page } = useSidecarsQuery();
  const dispatch = useDispatch();

  const loadSidecars = useCallback(() => {
    if (!isConnected || isAllLoaded) {
      return;
    }

    const nextPage = page + 1;

    dispatch(
      UserActions.fetchCurrentProviderSidecars(nextPage, SIDECARS_PER_PAGE),
    );
  }, [dispatch, isAllLoaded, isConnected, page]);

  return {
    isAllLoaded,
    isLoading: loading,
    loadSidecars,
  };
};
