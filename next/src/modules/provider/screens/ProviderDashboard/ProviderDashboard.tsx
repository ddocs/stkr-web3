import * as React from 'react';
import { useCallback } from 'react';
import { useProviderDashboardStyles } from './ProviderDashboardStyles';
import { MicropoolList } from '../../components/MicropoolList';
import { NodeList } from '../../components/NodeList';
import {
  PROVIDER_CREATE_MICROPOOL_PATH,
  PROVIDER_CREATE_NODE_LIST_PATH,
  PROVIDER_NODES_PATH,
  PROVIDER_PATH,
} from '../../../../common/const';
import { useLocation } from 'react-router';
import { ProviderTabs } from '../../components/ProviderTabs';
import { t, tHTML } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { Info } from '../../../../components/Info';
import { NavLink } from '../../../../UiKit/Link';
import { IPool } from '../../../../store/apiMappers/poolsApi';
import { UserActions, UserActionTypes, } from '../../../../store/actions/UserActions';
import { Query } from '@redux-requests/react';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { Route } from 'react-router-dom';
import { useAction } from '../../../../store/redux';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { IStats } from '../../../../store/apiMappers/statsApi';

interface IProviderDashboardStoreProps {
  micropools?: IPool[];
}

interface IProviderDashboardProps extends IProviderDashboardStoreProps {
  onCreateMicropool?(): void;
}

export const ProviderDashboardComponent = ({
  micropools,
}: IProviderDashboardProps) => {
  const classes = useProviderDashboardStyles();

  const location = useLocation();

  const renderNodeList = useCallback(
    () => <NodeList className={classes.table} />,
    [classes.table],
  );

  const renderMicropoolList = useCallback(
    () => <MicropoolList className={classes.table} data={micropools} />,
    [classes.table, micropools],
  );

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        <Query<IStats> type={UserActionTypes.FETCH_STATS}>
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
              data.totalMicroPools && (
                <Info className={classes.info} data={info} small={true} />
              )
            );
          }}
        </Query>
        <div className={classes.navigation}>
          <ProviderTabs className={classes.tabs} />
          {location.pathname === PROVIDER_PATH && !micropools ? (
            <></>
          ) : (
            <NavLink
              className={classes.create}
              href={
                location.pathname === PROVIDER_PATH
                  ? PROVIDER_CREATE_MICROPOOL_PATH
                  : PROVIDER_CREATE_NODE_LIST_PATH
              }
              variant="outlined"
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

const alwaysFalse = () => false;

export const ProviderDashboard = () => {
  const dispatchFetchCurrentProviderMicropools = useAction(
    UserActions.fetchCurrentProviderMicropools,
  );
  const dispatchFetchStats = useAction(UserActions.fetchStats);

  useInitEffect(() => {
    dispatchFetchCurrentProviderMicropools();
    dispatchFetchStats();
  });

  return (
    <Query<IPool[]>
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      isDataEmpty={alwaysFalse}
      type={UserActionTypes.FETCH_CURRENT_PROVIDER_MICROPOOLS}
    >
      {({ data: micropools }) => (
        <ProviderDashboardComponent micropools={micropools} />
      )}
    </Query>
  );
};
