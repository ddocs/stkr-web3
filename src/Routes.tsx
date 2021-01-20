import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoadingCentered } from './components/QueryLoading/QueryLoading';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { withDefaultLayout } from './modules/layout';
import {
  GOVERNANCE_CREATE_PROJECT_PATH,
  GOVERNANCE_PROJECT_LIST_PATH,
  GOVERNANCE_PROJECT_ROUTE,
  ANKR_IFRAME_PATH,
  INDEX_PATH,
  PICKER_PATH,
  PROVIDER_CREATE_NODE_PATH,
  PROVIDER_MAIN_PATH,
  PROVIDER_NODE_LIST_PATH,
  PROVIDER_TOP_UP_LIST_PATH,
  PROVIDER_TOP_UP_ROUTE,
  STAKER_DASHBOARD_PATH,
  STAKER_STAKE_PATH,
  ABOUT_AETH_PATH,
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

const TopUpContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/provider/screens/TopUp').then(module => module.TopUp),
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

const GovernanceListContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/governance/ProjectList').then(
        module => module.ProjectList,
      ),
    {
      fallback: <QueryLoadingCentered />,
    },
  ) as LoadableComponent<any>,
);

const CreateProjectContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/governance/CreateProject').then(
        module => module.CreateProject,
      ),
    {
      fallback: <QueryLoadingCentered />,
    },
  ) as LoadableComponent<any>,
);

const ProjectContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/governance/Project').then(module => module.Project),
    {
      fallback: <QueryLoadingCentered />,
    },
  ) as LoadableComponent<any>,
);

const AboutAethContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/about-aeth').then(module => module.AboutAeth),
    {
      fallback: <QueryLoadingCentered />,
    },
  ) as LoadableComponent<any>,
);

const LoadableIframeContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/iframe').then(module => module.Iframe),
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
        path={PROVIDER_CREATE_NODE_PATH}
        component={CreateBeaconChainContainer}
        exact={true}
      />
      <Route path={ANKR_IFRAME_PATH} component={LoadableIframeContainer} />
      <PrivateRoute
        path={[PROVIDER_TOP_UP_ROUTE]}
        component={TopUpContainer}
        exact={true}
      />
      <PrivateRoute
        path={[
          PROVIDER_MAIN_PATH,
          PROVIDER_NODE_LIST_PATH,
          PROVIDER_TOP_UP_LIST_PATH,
        ]}
        exact={true}
        component={ProviderContainer}
      />
      <PrivateRoute path={PICKER_PATH} component={PickerContainer} />
      <PrivateRoute
        path={STAKER_DASHBOARD_PATH}
        component={StakerDashboardContainer}
        exact={true}
      />
      <PrivateRoute path={STAKER_STAKE_PATH} component={StakerContainer} />
      <PrivateRoute
        path={GOVERNANCE_PROJECT_LIST_PATH}
        component={GovernanceListContainer}
        exact={true}
      />
      <PrivateRoute
        path={GOVERNANCE_CREATE_PROJECT_PATH}
        component={CreateProjectContainer}
        exact={true}
      />
      <PrivateRoute
        path={GOVERNANCE_PROJECT_ROUTE}
        component={ProjectContainer}
        exact={true}
      />
      <Route
        path={ABOUT_AETH_PATH}
        component={AboutAethContainer}
        exact={true}
      />
      <PrivateRoute component={PageNotFound} />
    </Switch>
  );
}
