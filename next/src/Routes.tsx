import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoading } from './components/QueryLoading/QueryLoading';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { withDefaultLayout } from './modules/layout';
import {
  CREATE_PROVIDERS_BEACON_CHAIN_PATH,
  CREATE_PROVIDERS_MICROPOOL_PATH,
  INDEX_PATH,
  PICKER_PATH,
  PROVIDER_BEACON_CHAIN_PATH,
  PROVIDER_PATH,
  SDK_PATH,
  STAKER_PATH,
} from './common/const';
import App from './modules/api/App';

const LoadableOverviewContainer = withDefaultLayout(
  loadable(async () => import('./modules/lobby').then(module => module.Lobby), {
    fallback: <QueryLoading />,
  }) as LoadableComponent<any>,
);

const ProviderContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/provider').then(module => module.Provider),
    {
      fallback: <QueryLoading />,
    },
  ) as LoadableComponent<any>,
);

const CreateBeaconChainContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/provider/screens/CreateBeaconChain').then(
        module => module.CreateBeaconChain,
      ),
    {
      fallback: <QueryLoading />,
    },
  ) as LoadableComponent<any>,
);

const CreateMicropoolContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/provider/screens/CreateMicropool').then(
        module => module.CreateMicropool,
      ),
    {
      fallback: <QueryLoading />,
    },
  ) as LoadableComponent<any>,
);

const PickerContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/picker').then(module => module.Picker),
    {
      fallback: <QueryLoading />,
    },
  ) as LoadableComponent<any>,
);

const StakerContainer = withDefaultLayout(
  loadable(async () => import('./modules/stake').then(module => module.Stake), {
    fallback: <QueryLoading />,
  }) as LoadableComponent<any>,
);

export function Routes() {
  return (
    <Switch>
      <Route
        path={INDEX_PATH}
        exact={true}
        component={LoadableOverviewContainer}
      />
      <Route
        path={[PROVIDER_PATH, PROVIDER_BEACON_CHAIN_PATH]}
        component={ProviderContainer}
        exact={true}
      />
      <Route
        path={CREATE_PROVIDERS_BEACON_CHAIN_PATH}
        component={CreateBeaconChainContainer}
        exact={true}
      />
      <Route
        path={CREATE_PROVIDERS_MICROPOOL_PATH}
        component={CreateMicropoolContainer}
        exact={true}
      />
      <Route path={PICKER_PATH} component={PickerContainer} />
      <Route path={STAKER_PATH} component={StakerContainer} />
      <Route path={SDK_PATH} exact={true} component={App} />
      <Route component={PageNotFound} />
    </Switch>
  );
}
