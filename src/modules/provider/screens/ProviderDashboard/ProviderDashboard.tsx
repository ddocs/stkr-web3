import * as React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { useProviderDashboardStyles } from './ProviderDashboardStyles';
import { NodeList } from '../../components/NodeList';
import {
  PROVIDER_CREATE_NODE_PATH,
  PROVIDER_MAIN_PATH,
  PROVIDER_MIN_BALANCE,
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
import { Box, Typography } from '@material-ui/core';
import { TopUpList } from '../../components/TopUpList';
import { IItemProps } from '../../components/ProviderTabs/ProviderTabs';
import { IStakerStats } from '../../../../store/apiMappers/stakerStatsApi';

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

  const tabs = useMemo<IItemProps[]>(
    () => [
      {
        label: t('navigation.beacon-list'),
        path: PROVIDER_NODE_LIST_PATH,
        route: PROVIDER_NODE_LIST_PATH,
      },
      ...(hasTransactions
        ? [
            {
              label: t('provider-tabs.top-up'),
              path: PROVIDER_TOP_UP_LIST_PATH,
              route: PROVIDER_TOP_UP_LIST_PATH,
            },
          ]
        : []),
    ],
    [hasTransactions],
  );

  const renderNodeList = useCallback(
    () =>
      sidecars ? <NodeList className={classes.table} data={sidecars} /> : null,
    [classes.table, sidecars],
  );

  const renderTopUpList = useCallback(() => {
    return <TopUpList />;
  }, []);

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        <div className={classes.navigation}>
          <ProviderTabs className={classes.tabs} tabs={tabs} />
          <Query<IProviderStats | null>
            type={UserActionTypes.FETCH_PROVIDER_STATS}
            showLoaderDuringRefetch={false}
          >
            {({ data }) => {
              const hasEnoughBalance = data?.balance.isGreaterThanOrEqualTo(
                PROVIDER_MIN_BALANCE,
              );

              return (
                <>
                  {hasEnoughBalance && sidecars && sidecars.length > 0 && (
                    <Route
                      path={[PROVIDER_MAIN_PATH, PROVIDER_NODE_LIST_PATH]}
                      render={() => (
                        <NavLink
                          className={classes.create}
                          href={PROVIDER_CREATE_NODE_PATH}
                          variant="contained"
                          color="primary"
                        >
                          {t('provider-dashboard.create')}
                        </NavLink>
                      )}
                      exact={true}
                    />
                  )}
                  <Route
                    path={[PROVIDER_TOP_UP_LIST_PATH]}
                    render={() => (
                      <Box display="flex" alignItems="center">
                        <Typography className={classes.balance}>
                          {t('provider-dashboard.balance', {
                            value: data?.balance.toFormat(),
                          })}
                        </Typography>
                        <NavLink
                          href={PROVIDER_TOP_UP_PATH}
                          variant="contained"
                          disabled={!hasEnoughBalance}
                          color="primary"
                        >
                          {t('provider-dashboard.top-up')}
                        </NavLink>
                      </Box>
                    )}
                    exact={true}
                  />
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
