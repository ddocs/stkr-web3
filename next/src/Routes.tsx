import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoading } from './components/QueryLoading/QueryLoading';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { withDefaultLayout } from './modules/layout';
import { INDEX_PATH, PICKER_PATH, PROVIDER_PATH } from './common/const';

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

const PickerContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/picker').then(module => module.Picker),
    {
      fallback: <QueryLoading />,
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
      <Route path={PROVIDER_PATH} component={ProviderContainer} />
      <Route path={PICKER_PATH} component={PickerContainer} />
      <Route component={PageNotFound} />
    </Switch>
  );
}
