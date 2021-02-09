import { useQuery } from '@redux-requests/react';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Milliseconds } from '../../../../common/types';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import { useInterval } from '../../../../common/utils/useInterval';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IProviderStats } from '../../../../store/apiMappers/providerStatsApi';
import { DIALOG_CREATE_NODE } from '../../../../store/dialogs/actions';
import { useDialog } from '../../../../store/dialogs/selectors';
import { SIDECARS_PER_PAGE } from '../../const';
import { useSidecarsQuery } from '../../hooks/useSidecarsQuery';

const LONG_UPDATE_INTERVAL: Milliseconds = 60_000;

export const useProviderDashboard = () => {
  const { isConnected } = useAuthentication();
  const dispatch = useDispatch();

  const {
    isOpened: isCreateNodeDialogOpen,
    handleClose: closeCreateNodeDialog,
    handleOpen: openCreateNodeDialog,
  } = useDialog(DIALOG_CREATE_NODE);

  const handleCreateNode = useCallback(() => {
    openCreateNodeDialog();
  }, [openCreateNodeDialog]);

  const sidecarsQuery = useSidecarsQuery();

  const providerStatsQuery = useQuery<IProviderStats | null>({
    type: UserActionTypes.FETCH_PROVIDER_STATS,
  });

  const error = sidecarsQuery.error || providerStatsQuery.error;
  const providerStatsLoading = providerStatsQuery.loading;

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    dispatch(UserActions.fetchGlobalStats());
    dispatch(UserActions.fetchProviderStats());
  }, [dispatch, isConnected]);

  useEffect(() => {
    const sidecarsAlreadyLoaded = !!sidecarsQuery.data;
    if (!isConnected || sidecarsAlreadyLoaded) {
      return;
    }

    dispatch(UserActions.fetchCurrentProviderSidecars(0, SIDECARS_PER_PAGE));
  }, [dispatch, isConnected, sidecarsQuery.data]);

  useInterval(() => {
    dispatch(UserActions.fetchGlobalStats());
  }, LONG_UPDATE_INTERVAL);

  return {
    sidecars: sidecarsQuery.data,
    providerStats: providerStatsQuery.data,
    error,
    providerStatsLoading,
    isCreateNodeDialogOpen,
    closeCreateNodeDialog,
    handleCreateNode,
  };
};
