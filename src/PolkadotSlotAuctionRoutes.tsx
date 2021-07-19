import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { withPolkadotSlotAuctionLayout } from './modules/polkadotSlotAuction/layout';
import { QueryLoadingAbsolute } from './components/QueryLoading/QueryLoading';
import { INDEX_PATH } from './common/const';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PrivateRoute } from './UiKit/PrivateRoute';

const PolkadotSlotAuctionContainer = withPolkadotSlotAuctionLayout(
  loadable(
    async () =>
      import('./modules/polkadotSlotAuction/PolkadotSlotAuction').then(
        module => module.PolkadotSlotAuction,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

export function PolkadotSlotAuctionRoutes() {
  return (
    <Switch>
      <Route path={INDEX_PATH} component={PolkadotSlotAuctionContainer} exact />
      <PrivateRoute component={PageNotFound} />
    </Switch>
  );
}