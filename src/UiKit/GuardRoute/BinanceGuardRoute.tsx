import React from 'react';
import { Route } from 'react-router-dom';
import { BinanceConnect } from '../../components/Connect/BinanceConnect';
import { UnsupportedNetwork } from '../../components/UnsupportedNetwork/UnsupportedNetwork';
import { DefaultLayout } from '../../modules/layout/components/DefautLayout';
import { IGuardRoute } from './GuardRoute';
import { useGuardRoute } from './useGuardRoute';

export const BinanceGuardRoute = ({
  availableNetworks,
  ...routeProps
}: IGuardRoute) => {
  const { isAuth, filteredNetworks, isUnsupportedNetwork } = useGuardRoute(
    availableNetworks,
  );

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
      <BinanceConnect networks={filteredNetworks} />
    </DefaultLayout>
  );
};
