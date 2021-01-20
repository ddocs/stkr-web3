import * as React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { useProviderDashboardStyles } from './ProviderDashboardStyles';
import { NodeList } from '../../components/NodeList';
import {
  PROVIDER_MAIN_PATH,
  PROVIDER_NODE_LIST_PATH,
  PROVIDER_TOP_UP_LIST_PATH,
  PROVIDER_TOP_UP_PATH,
} from '../../../../common/const';
import { ProviderTabs } from '../../components/ProviderTabs';
import { t } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { NavLink } from '../../../../UiKit/NavLink';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Query } from '@redux-requests/react';
import { QueryLoadingCentered } from '../../../../components/QueryLoading/QueryLoading';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { Route } from 'react-router-dom';
import { ISidecar } from '../../../../store/apiMappers/sidecarsApi';
import { useDispatch } from 'react-redux';
import { useInterval } from '../../../../common/utils/useInterval';
import { Milliseconds } from '../../../../common/types';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import { alwaysFalse } from '../../../../common/utils/alwaysFalse';
import { IProviderStats } from '../../../../store/apiMappers/providerStatsApi';
import { Box, Button, Typography } from '@material-ui/core';
import { TopUpList } from '../../components/TopUpList';
import { IItemProps } from '../../components/ProviderTabs/ProviderTabs';
import { IStakerStats } from '../../../../store/apiMappers/stakerStatsApi';
import { useDialog } from '../../../../store/dialogs/selectors';
import { DIALOG_CREATE_NODE } from '../../../../store/dialogs/actions';
import { CreateNodeDialog } from '../../components/CreateNodeDialog';

const SHORT_UPDATE_INTERVAL: Milliseconds = 30_000;
const LONG_UPDATE_INTERVAL: Milliseconds = 60_000;

interface IProviderDashboardStoreProps {
  sidecars: ISidecar[] | null;
  hasTransactions: boolean;
}

interface IProviderDashboardProps extends IProviderDashboardStoreProps {}

export const ProviderDashboardComponent = ({
  sidecars,
  hasTransactions,
}: IProviderDashboardProps) => {
  const classes = useProviderDashboardStyles();

  const {
    isOpened: isCreateNodeDialogOpen,
    handleClose: closeCreateNodeDialog,
    handleOpen: openCreateNodeDialog,
  } = useDialog(DIALOG_CREATE_NODE);

  const handleCreateNode = useCallback(() => {
    openCreateNodeDialog();
  }, [openCreateNodeDialog]);

  const tabs = useMemo<IItemProps[]>(
    () => [
      {
        label: t('navigation.beacon-list'),
        path: PROVIDER_NODE_LIST_PATH,
        route: [PROVIDER_NODE_LIST_PATH, PROVIDER_MAIN_PATH],
      },
      ...[
        {
          label: t('provider-tabs.top-ups'),
          path: PROVIDER_TOP_UP_LIST_PATH,
          route: PROVIDER_TOP_UP_LIST_PATH,
        },
      ],
    ],
    [],
  );

  const renderNodeList = useCallback(
    () =>
      sidecars ? (
        <NodeList
          className={classes.table}
          data={sidecars}
          handleCreateNode={handleCreateNode}
        />
      ) : null,
    [classes.table, sidecars, handleCreateNode],
  );

  const renderTopUpList = useCallback(() => {
    return <TopUpList />;
  }, []);

  return (
    <>
      <section className={classes.component}>
        <Curtains classes={{ root: classes.wrapper }}>
          <div className={classes.navigation}>
            <ProviderTabs className={classes.tabs} tabs={tabs} />
            <Query<IProviderStats | null>
              type={UserActionTypes.FETCH_PROVIDER_STATS}
              showLoaderDuringRefetch={false}
              errorComponent={QueryError}
              loadingComponent={QueryLoadingCentered}
            >
              {({ data }) => {
                return (
                  <>
                    <Box display="flex" alignItems="center">
                      <Typography className={classes.balance}>
                        {t('provider-dashboard.balance', {
                          value: data?.balance.toFormat(),
                        })}
                      </Typography>
                      <Route
                        path={[PROVIDER_TOP_UP_LIST_PATH]}
                        exact={true}
                        render={() => (
                          <NavLink
                            href={PROVIDER_TOP_UP_PATH}
                            variant="contained"
                            color="primary"
                          >
                            {t('provider-dashboard.top-up')}
                          </NavLink>
                        )}
                      />
                      {sidecars &&
                        sidecars.length > 0 && ( // TODO: revert hasEnoughBalance
                          <Route
                            path={[PROVIDER_MAIN_PATH, PROVIDER_NODE_LIST_PATH]}
                            exact={true}
                            render={() => (
                              <Button
                                color="primary"
                                size="medium"
                                onClick={handleCreateNode}
                              >
                                {t('empty-node-list.submit')}
                              </Button>
                            )}
                          />
                        )}
                    </Box>
                  </>
                );
              }}
            </Query>
          </div>
          <Route
            path={[PROVIDER_MAIN_PATH, PROVIDER_NODE_LIST_PATH]}
            render={renderNodeList}
            exact={true}
          />
          <Route
            path={[PROVIDER_TOP_UP_LIST_PATH]}
            render={renderTopUpList}
            exact={true}
          />
        </Curtains>
      </section>
      <CreateNodeDialog
        isOpened={isCreateNodeDialogOpen}
        handleClose={closeCreateNodeDialog}
      />
    </>
  );
};

export const ProviderDashboard = () => {
  const dispatch = useDispatch();
  const { isConnected } = useAuthentication();

  useEffect(() => {
    if (isConnected) {
      dispatch(UserActions.fetchCurrentProviderSidecars());
      dispatch(UserActions.fetchGlobalStats());
      dispatch(UserActions.fetchProviderStats());
    }
  }, [dispatch, isConnected]);

  useInterval(() => {
    dispatch(UserActions.fetchCurrentProviderSidecars());
  }, SHORT_UPDATE_INTERVAL);

  useInterval(() => {
    dispatch(UserActions.fetchGlobalStats());
  }, LONG_UPDATE_INTERVAL);

  return (
    <Query<ISidecar[] | null>
      type={UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS}
      errorComponent={QueryError}
      loadingComponent={QueryLoadingCentered}
      showLoaderDuringRefetch={false}
      isDataEmpty={alwaysFalse}
    >
      {({ data: sidecars }) => {
        return (
          <Query<IStakerStats | null>
            type={UserActionTypes.FETCH_STAKER_STATS}
            errorComponent={QueryError}
            loadingComponent={QueryLoadingCentered}
            showLoaderDuringRefetch={false}
          >
            {({ data: stats }) => {
              return (
                <ProviderDashboardComponent
                  sidecars={sidecars}
                  hasTransactions={
                    !!(
                      stats &&
                      stats.stakes.filter(item => item.isTopUp).length > 0
                    )
                  }
                />
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};
