import * as React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { useProviderDashboardStyles } from './ProviderDashboardStyles';
import { MicropoolList } from '../../components/MicropoolList';
import { NodeList } from '../../components/NodeList';
import {
  PROVIDER_CREATE_MICROPOOL_PATH,
  PROVIDER_CREATE_NODE_PATH,
  PROVIDER_MICROPOOL_LIST_PATH,
  PROVIDER_NODES_PATH,
  PROVIDER_PATH,
} from '../../../../common/const';
import { useRouteMatch } from 'react-router';
import { ProviderTabs } from '../../components/ProviderTabs';
import { t, tHTML } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { Info } from '../../../../components/Info';
import { NavLink } from '../../../../UiKit/NavLink';
import { IPool } from '../../../../store/apiMappers/poolsApi';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Query } from '@redux-requests/react';
import { QueryLoadingCentered } from '../../../../components/QueryLoading/QueryLoading';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { Route } from 'react-router-dom';
import { IProviderStats } from '../../../../store/apiMappers/providerStatsApi';
import { alwaysFalse } from '../../../../common/utils/alwaysFalse';
import { ISidecar } from '../../../../store/apiMappers/sidecarsApi';
import { useDispatch } from 'react-redux';
import { useInterval } from '../../../../common/utils/useInterval';
import { Milliseconds } from '../../../../common/types';
import { useAuthentication } from '../../../../common/utils/useAuthentications';

const SHORT_UPDATE_INTERVAL: Milliseconds = 10_000;
const LONG_UPDATE_INTERVAL: Milliseconds = 60_000;

interface IProviderDashboardStoreProps {
  micropools: IPool[] | null;
  nodes: ISidecar[] | null;
}

interface IProviderDashboardProps extends IProviderDashboardStoreProps {
  onCreateMicropool?(): void;
}

export const ProviderDashboardComponent = ({
  micropools,
  nodes,
}: IProviderDashboardProps) => {
  const classes = useProviderDashboardStyles();

  const isMicropoolListRoute = useRouteMatch({
    path: PROVIDER_MICROPOOL_LIST_PATH,
    exact: true,
  });

  const renderNodeList = useCallback(
    () => (nodes ? <NodeList className={classes.table} data={nodes} /> : null),
    [classes.table, nodes],
  );

  const renderMicropoolList = useCallback(
    () => <MicropoolList className={classes.table} data={micropools} />,
    [classes.table, micropools],
  );

  const hasPendingMicropoolStatus = useMemo(
    () => micropools?.some(item => item.status === 'MICRO_POOL_STATUS_PENDING'),
    [micropools],
  );

  const hasMicropools = micropools && micropools.length > 0;

  const hasCreatedNodeStatus = nodes?.some(
    item => item.status === 'VALIDATOR_STATUS_FREE',
  );

  const hasNodes = nodes && nodes.length > 0;

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        <Query<IProviderStats>
          type={UserActionTypes.FETCH_PROVIDER_STATS}
          showLoaderDuringRefetch={false}
        >
          {({ data }) => {
            const info = [
              {
                caption: 'provider.info.totalStaked',
                value: tHTML('units.small-eth', {
                  value: data.totalEthereumStaked.toFormat(),
                }),
              },
              {
                caption: 'provider.info.totalStakers',
                value: data.totalStakers,
              },
              {
                caption: 'provider.info.micropools',
                value: data.totalMicroPools,
              },
            ];

            return (
              data.totalMicroPools > 0 && (
                <Info className={classes.info} data={info} small={true} />
              )
            );
          }}
        </Query>
        <div className={classes.navigation}>
          <ProviderTabs className={classes.tabs} />
          {isMicropoolListRoute
            ? hasMicropools && (
                <NavLink
                  className={classes.create}
                  href={PROVIDER_CREATE_MICROPOOL_PATH}
                  variant="outlined"
                  disabled={hasPendingMicropoolStatus}
                  color="primary"
                >
                  {t('navigation.create')}
                </NavLink>
              )
            : hasNodes && (
                <NavLink
                  className={classes.create}
                  href={PROVIDER_CREATE_NODE_PATH}
                  variant="outlined"
                  disabled={hasCreatedNodeStatus}
                  color="primary"
                >
                  {t('navigation.create')}
                </NavLink>
              )}
        </div>
        <Route
          path={[PROVIDER_PATH]}
          render={renderMicropoolList}
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
      dispatch(UserActions.fetchCurrentProviderMicropools());
      dispatch(UserActions.fetchCurrentProviderSidecars());
      dispatch(UserActions.fetchProviderStats());
    }
  }, [dispatch, isConnected]);

  useInterval(() => {
    dispatch(UserActions.fetchCurrentProviderMicropools());
    dispatch(UserActions.fetchCurrentProviderSidecars());
  }, SHORT_UPDATE_INTERVAL);

  useInterval(() => {
    dispatch(UserActions.fetchProviderStats());
  }, LONG_UPDATE_INTERVAL);

  const render = useCallback(({ data: nodes }: { data: ISidecar[] | null }) => {
    return (
      <Query<IPool[] | null>
        errorComponent={QueryError}
        loadingComponent={QueryLoadingCentered}
        isDataEmpty={alwaysFalse}
        type={UserActionTypes.FETCH_CURRENT_PROVIDER_MICROPOOLS}
        showLoaderDuringRefetch={false}
      >
        {({ data: micropools }) => {
          return (
            <ProviderDashboardComponent micropools={micropools} nodes={nodes} />
          );
        }}
      </Query>
    );
  }, []);

  return (
    <Query<ISidecar[] | null>
      type={UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS}
      errorComponent={QueryError}
      loadingComponent={QueryLoadingCentered}
      showLoaderDuringRefetch={false}
    >
      {render}
    </Query>
  );
};
