import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useProviderDashboardStyles } from './ProviderDashboardStyles';
import { NodeList } from '../../components/NodeList';
import {
  PROVIDER_MIN_BALANCE,
  PROVIDER_CREATE_NODE_PATH,
  PROVIDER_NODES_PATH,
  PROVIDER_TOP_UP_ROUTE,
} from '../../../../common/const';
import { ProviderTabs } from '../../components/ProviderTabs';
import { t, tHTML } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { Info } from '../../../../components/Info';
import { NavLink } from '../../../../UiKit/NavLink';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Query } from '@redux-requests/react';
import { QueryLoadingCentered } from '../../../../components/QueryLoading/QueryLoading';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { Route } from 'react-router-dom';
import { IGlobalStats } from '../../../../store/apiMappers/globalStatsApi';
import { ISidecar } from '../../../../store/apiMappers/sidecarsApi';
import { useDispatch } from 'react-redux';
import { useInterval } from '../../../../common/utils/useInterval';
import { Milliseconds } from '../../../../common/types';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import { TopUpContainer } from '../TopUp';
import { alwaysFalse } from '../../../../common/utils/alwaysFalse';
import { IProviderStats } from '../../../../store/apiMappers/providerStatsApi';
import { Typography } from '@material-ui/core';

const SHORT_UPDATE_INTERVAL: Milliseconds = 30_000;
const LONG_UPDATE_INTERVAL: Milliseconds = 60_000;

interface IProviderDashboardStoreProps {
  sidecars: ISidecar[] | null;
}

interface IProviderDashboardProps extends IProviderDashboardStoreProps {}

export const ProviderDashboardComponent = ({
  sidecars,
}: IProviderDashboardProps) => {
  const classes = useProviderDashboardStyles();

  const renderNodeList = useCallback(
    () =>
      sidecars ? <NodeList className={classes.table} data={sidecars} /> : null,
    [classes.table, sidecars],
  );

  const renderTopUp = useCallback(() => {
    return <TopUpContainer />;
  }, []);

  const hasNodes = sidecars && sidecars.length > 0;
  console.log('hasNodes will be used soon', hasNodes);

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        <Query<IGlobalStats>
          type={UserActionTypes.FETCH_GLOBAL_STATS}
          showLoaderDuringRefetch={false}
        >
          {({ data }) => {
            const info = [
              {
                caption: 'provider.info.totalEth2Stakes',
                value: tHTML('units.small-eth', {
                  value: data.totalStakedEthereum.toString(),
                }),
              },
              {
                caption: 'provider.info.activeValidators',
                value: data.activePoolCount,
              },
              {
                caption: 'provider.info.pendingEthStakes',
                value: tHTML('units.small-eth', {
                  value: 0,
                }),
              },
              {
                caption: 'provider.info.activeSidecars',
                value: data.activeSidecarCount,
              },
            ];

            return (
              data.activePoolCount > 0 && (
                <Info className={classes.info} data={info} small={true} />
              )
            );
          }}
        </Query>
        <div className={classes.navigation}>
          <ProviderTabs className={classes.tabs} />
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
                  <Route
                    path={[PROVIDER_NODES_PATH]}
                    render={() => (
                      <NavLink
                        className={classes.create}
                        href={PROVIDER_CREATE_NODE_PATH}
                        variant="outlined"
                        disabled={!hasEnoughBalance}
                        color="primary"
                      >
                        {t('navigation.create')}
                      </NavLink>
                    )}
                    exact={true}
                  />
                  <Route
                    path={[PROVIDER_TOP_UP_ROUTE]}
                    render={() => (
                      <Typography className={classes.balance}>
                        {t('provider-dashboard.balance', {
                          value: data?.balance.toFormat(),
                        })}
                      </Typography>
                    )}
                    exact={true}
                  />
                </>
              );
            }}
          </Query>
        </div>
        <Route
          path={[PROVIDER_TOP_UP_ROUTE]}
          render={renderTopUp}
          exact={true}
        />
        <Route
          path={[PROVIDER_NODES_PATH]}
          render={renderNodeList}
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
        return <ProviderDashboardComponent sidecars={sidecars} />;
      }}
    </Query>
  );
};
