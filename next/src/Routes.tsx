import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { withDefaultLayout } from './modules/layout/components/DefautLayout/DefautLayout';
import { AppLoading } from './modules/common/components/AppLoading/AppLoading';
import { PageNotFound } from './modules/common/components/PageNotFound/PageNotFound';

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
      <Route path={'/'} exact={true} component={LoadableOverviewContainer} />
      <Route component={PageNotFound} />
    </Switch>
  );
}
