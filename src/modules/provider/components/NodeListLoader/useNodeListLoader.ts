import { useQuery } from '@redux-requests/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntersectionObserver } from '../../../../common/hooks/useIntersectionObserver';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { ISidecar } from '../../../../store/apiMappers/sidecarsApi';
import { SIDECARS_PER_PAGE } from '../../const';

export const useNodeListLoader = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const { isConnected } = useAuthentication();
  const dispatch = useDispatch();

  const sidecarsQuery = useQuery<ISidecar[] | null>({
    type: UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS,
  });

  const loadSidecars = useCallback(() => {
    if (isConnected) {
      dispatch(
        UserActions.fetchCurrentProviderSidecars(page, SIDECARS_PER_PAGE),
      );
      setPage(page => page + 1);
      setIsLoaderVisible(false);
    }
  }, [dispatch, isConnected, page]);

  useIntersectionObserver((isVisible: boolean) => {
    if (isVisible) {
      setIsLoaderVisible(isVisible);
    }
  }, ref);

  useEffect(() => {
    if (isLoaderVisible && !isAllLoaded) {
      loadSidecars();
    }
  }, [isAllLoaded, isLoaderVisible, loadSidecars]);

  useEffect(() => {
    if (sidecarsQuery.data && !sidecarsQuery.data.length) {
      setIsAllLoaded(true);
    }
  }, [sidecarsQuery.data]);

  return {
    isAllLoaded,
    isLoading: sidecarsQuery.loading,
    ref,
  };
};
