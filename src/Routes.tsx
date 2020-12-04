import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoadingCentered } from './components/QueryLoading/QueryLoading';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { withDefaultLayout } from './modules/layout';
import {
    INDEX_PATH,
    PICKER_PATH,
    PROVIDER_CREATE_NODE_PATH,
    PROVIDER_NODES_PATH,
    PROVIDER_PATH,
    PROVIDER_TOP_UP_ROUTE,
    STAKER_DASHBOAR_PATH,
    STAKER_STAKE_PATH,
} from './common/const';
import { PrivateRoute } from './UiKit/PrivateRoute';

const LoadableOverviewContainer = withDefaultLayout(
  loadable(async () => import('./modules/lobby').then(module => module.Lobby), {
    fallback: <QueryLoadingCentered />,
  }) as LoadableComponent<any>,
);

const ProviderContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/provider').then(module => module.Provider),
    {
      fallback: <QueryLoadingCentered />,
    },
  ) as LoadableComponent<any>,
);

const CreateBeaconChainContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/provider/screens/CreateNode').then(
        module => module.CreateNode,
      ),
    {
      fallback: <QueryLoadingCentered />,
    },
  ) as LoadableComponent<any>,
);

const PickerContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/picker').then(module => module.Picker),
    {
      fallback: <QueryLoadingCentered />,
    },
  ) as LoadableComponent<any>,
);

const StakerDashboardContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/stake/screens/StakerDashboard').then(
        module => module.StakerDashboard,
      ),
    {
      fallback: <QueryLoadingCentered />,
    },
  ) as LoadableComponent<any>,
);

const StakerContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/stake/screens/Stake').then(module => module.Stake),
    {
      fallback: <QueryLoadingCentered />,
    },
  ) as LoadableComponent<any>,
);

export function Routes() {
  return (
    <Switch>
      <Route
        path={INDEX_PATH}
        exact={true}
        component={LoadableOverviewContainer}
      />
      <PrivateRoute
        path={[
          PROVIDER_PATH,
          PROVIDER_TOP_UP_ROUTE,
          PROVIDER_NODES_PATH,
        ]}
        component={ProviderContainer}
        exact={true}
      />
      <PrivateRoute
        path={PROVIDER_CREATE_NODE_PATH}
        component={CreateBeaconChainContainer}
        exact={true}
      />
      <PrivateRoute path={PICKER_PATH} component={PickerContainer} />
      <PrivateRoute
        path={STAKER_DASHBOAR_PATH}
        component={StakerDashboardContainer}
        exact={true}
      />
      <PrivateRoute path={STAKER_STAKE_PATH} component={StakerContainer} />
      <PrivateRoute component={PageNotFound} />
    </Switch>
  );
}
