import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';
import { web3Enable } from '@polkadot/extension-dapp';
import { PolkadotProvider } from '@ankr.com/stakefi-polkadot';
import { Connect } from '../../components/Connect';
import { PolkadotExtension } from '../../components/PolkadotExtension';
import { UnsupportedNetwork } from '../../components/UnsupportedNetwork';
import { DefaultLayout } from '../../modules/layout/components/DefautLayout';
import { useGuardRoute } from './useGuardRoute';
import { useGuardRouteStyles } from './GuardRouteStyles';

export interface IGuardRoute extends RouteProps {
  availableNetworks: number[];
  needPolkadotExtension?: boolean;
}

export const GuardRoute = ({
  availableNetworks,
  needPolkadotExtension,
  ...routeProps
}: IGuardRoute) => {
  const classes = useGuardRouteStyles();

  const { isAuth, filteredNetworks, isUnsupportedNetwork } = useGuardRoute(
    availableNetworks,
  );

  web3Enable('stakefi.com');

  if (isUnsupportedNetwork) {
    return (
      <DefaultLayout>
        <UnsupportedNetwork networks={filteredNetworks} />
      </DefaultLayout>
    );
  }

  if (!isAuth) {
    return (
      <DefaultLayout>
        <Connect networks={filteredNetworks} />
      </DefaultLayout>
    );
  }

  if (needPolkadotExtension && !PolkadotProvider.isSupported()) {
    return (
      <DefaultLayout>
        <Container maxWidth="md">
          <Paper variant="outlined" square={false} className={classes.paper}>
            <PolkadotExtension />
          </Paper>
        </Container>
      </DefaultLayout>
    );
  }

  return <Route {...routeProps} />;
};
