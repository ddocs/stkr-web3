import React, { useEffect, useState } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';
import { web3Enable, isWeb3Injected } from '@polkadot/extension-dapp';
import { PolkadotExtension } from '../../../components/PolkadotExtension';
import { DefaultLayout } from '../../../modules/layout/components/DefautLayout';
import { usePolkadotGuardRouteStyles } from './PolkadotGuardRouteStyles';
import { QueryLoadingAbsolute } from '../../../components/QueryLoading/QueryLoading';

export const PolkadotGuardRoute = ({ ...routeProps }: RouteProps) => {
  const classes = usePolkadotGuardRouteStyles();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await web3Enable('stakefi.com');
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <QueryLoadingAbsolute />;
  }

  if (!isWeb3Injected) {
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
