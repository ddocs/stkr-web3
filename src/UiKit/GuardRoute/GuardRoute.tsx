import React, { useEffect, useState } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';
import { web3Enable, isWeb3Injected } from '@polkadot/extension-dapp';
import { Connect } from '../../components/Connect';
import { PolkadotExtension } from '../../components/PolkadotExtension';
import { UnsupportedNetwork } from '../../components/UnsupportedNetwork';
import { DefaultLayout } from '../../modules/layout/components/DefautLayout';
import { useGuardRoute } from './useGuardRoute';
import { useGuardRouteStyles } from './GuardRouteStyles';
import { QueryLoadingAbsolute } from '../../components/QueryLoading/QueryLoading';

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (needPolkadotExtension) {
      const enableWeb3 = async () => {
        await web3Enable('stakefi.com');
        setLoading(false);
      };
      enableWeb3();
    } else {
      setLoading(false);
    }
  }, [needPolkadotExtension]);

  if (loading) {
    return <QueryLoadingAbsolute />;
  }

  if (needPolkadotExtension && !isWeb3Injected) {
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

  if (isUnsupportedNetwork) {
    return (
      <DefaultLayout>
        <UnsupportedNetwork networks={filteredNetworks} />
      </DefaultLayout>
    );
  }

  if (isAuth) {
    return <Route {...routeProps} />;
  }

  return (
    <DefaultLayout>
      <Connect networks={filteredNetworks} />
    </DefaultLayout>
  );
};
