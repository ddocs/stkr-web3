import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { AppLoading } from './components/AppLoading/AppLoading';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { withDefaultLayout } from './modules/layout';
import { INDEX_PATH } from './common/const';

const LoadableOverviewContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/lobby/screens/Lobby/Lobby').then(module => module.Main),
    {
      fallback: <AppLoading />,
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
      <Route component={PageNotFound} />
    </Switch>
  );
}
