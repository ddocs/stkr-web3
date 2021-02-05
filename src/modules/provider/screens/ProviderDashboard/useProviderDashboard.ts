import { useQuery } from '@redux-requests/react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Milliseconds } from '../../../../common/types';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import { useInterval } from '../../../../common/utils/useInterval';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IProviderStats } from '../../../../store/apiMappers/providerStatsApi';
import { ISidecar } from '../../../../store/apiMappers/sidecarsApi';
import { IStakerStats } from '../../../../store/apiMappers/stakerStatsApi';
import { DIALOG_CREATE_NODE } from '../../../../store/dialogs/actions';
import { useDialog } from '../../../../store/dialogs/selectors';
import { SIDECARS_PER_PAGE } from '../../const';

const LONG_UPDATE_INTERVAL: Milliseconds = 60_000;

export const useProviderDashboard = () => {
  const { isConnected } = useAuthentication();
  const [sidecars, setSidecars] = useState<ISidecar[] | null>(null);
  const dispatch = useDispatch();

  const {
    isOpened: isCreateNodeDialogOpen,
    handleClose: closeCreateNodeDialog,
    handleOpen: openCreateNodeDialog,
  } = useDialog(DIALOG_CREATE_NODE);

  const handleCreateNode = useCallback(() => {
    openCreateNodeDialog();
  }, [openCreateNodeDialog]);

  const sidecarsQuery = useQuery<ISidecar[] | null>({
    type: UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS,
  });

  const stakerStatsQuery = useQuery<IStakerStats | null>({
    type: UserActionTypes.FETCH_STAKER_STATS,
  });

  const providerStatsQuery = useQuery<IProviderStats | null>({
    type: UserActionTypes.FETCH_PROVIDER_STATS,
  });

  const error =
    sidecarsQuery.error || stakerStatsQuery.error || providerStatsQuery.error;
  const isLoading = stakerStatsQuery.loading || providerStatsQuery.loading;

  useEffect(() => {
    const { data } = sidecarsQuery;
    if (data) {
      const mergedSidecars = sidecars ? [...sidecars, ...data] : data;
      setSidecars(mergedSidecars);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidecarsQuery.data]);

  useEffect(() => {
    if (isConnected) {
      dispatch(UserActions.fetchCurrentProviderSidecars(0, SIDECARS_PER_PAGE));
      dispatch(UserActions.fetchGlobalStats());
      dispatch(UserActions.fetchProviderStats());
    }
  }, [dispatch, isConnected]);

  useInterval(() => {
    dispatch(UserActions.fetchGlobalStats());
  }, LONG_UPDATE_INTERVAL);

  return {
    sidecars,
    providerStats: providerStatsQuery.data,
    error,
    isLoading,
    isCreateNodeDialogOpen,
    closeCreateNodeDialog,
    handleCreateNode,
  };
};
