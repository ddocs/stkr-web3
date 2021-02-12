import loadable, { LoadableComponent } from '@loadable/component';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  ABOUT_AETH_PATH,
  ABOUT_SMARTCHAIN_PATH,
  ANKR_IFRAME_PATH,
  CONVERT_ROUTE,
  GOVERNANCE_CREATE_PROJECT_PATH,
  GOVERNANCE_PROJECT_LIST_PATH,
  GOVERNANCE_PROJECT_ROUTE,
  INDEX_PATH,
  PICKER_PATH,
  PROVIDER_CREATE_NODE_PATH,
  PROVIDER_DEPOSIT_LIST_PATH,
  PROVIDER_DEPOSIT_ROUTE,
  PROVIDER_MAIN_PATH,
  PROVIDER_NODE_LIST_PATH,
  STAKER_DASHBOARD_PATH,
  STAKER_STAKE_PATH,
} from './common/const';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { QueryLoadingAbsolute } from './components/QueryLoading/QueryLoading';
import { withDefaultLayout } from './modules/layout';
import { PrivateRoute } from './UiKit/PrivateRoute';

const LoadableOverviewContainer = withDefaultLayout(
  loadable(async () => import('./modules/lobby').then(module => module.Lobby), {
    fallback: <QueryLoadingAbsolute />,
  }) as LoadableComponent<any>,
);

const ProviderContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/provider').then(module => module.Provider),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const TopUpContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/provider/screens/Deposit').then(
        module => module.Deposit,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
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
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const PickerContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/picker').then(module => module.Picker),
    {
      fallback: <QueryLoadingAbsolute />,
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
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const StakerContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/stake/screens/Stake').then(module => module.Stake),
    {
      fallback: <QueryLoadingAbsolute />,
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
      fallback: <QueryLoadingAbsolute />,
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
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const ProjectContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/governance/Project').then(module => module.Project),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const AboutAethContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/about-aeth').then(module => module.AboutAeth),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const LoadableIframeContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/iframe').then(module => module.Iframe),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const LoadableConvertContainer = loadable(
  async () =>
    import('./modules/convert/screens/Convert').then(module => module.Convert),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableAboutSmartchainContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/convert/screens/AboutSmartchain').then(
        module => module.AboutSmartchain,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
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
        path={[PROVIDER_DEPOSIT_ROUTE]}
        component={TopUpContainer}
        exact={true}
      />
      <PrivateRoute
        path={[
          PROVIDER_MAIN_PATH,
          PROVIDER_NODE_LIST_PATH,
          PROVIDER_DEPOSIT_LIST_PATH,
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
      <Route
        path={ABOUT_AETH_PATH}
        component={AboutAethContainer}
        exact={true}
      />
      <Route
        path={ABOUT_SMARTCHAIN_PATH}
        component={LoadableAboutSmartchainContainer}
        exact={true}
      />
      {/*TODO Only Smartchain Route*/}
      <PrivateRoute
        path={CONVERT_ROUTE}
        component={LoadableConvertContainer}
        exact={true}
      />
      <PrivateRoute component={PageNotFound} />
    </Switch>
  );
}
