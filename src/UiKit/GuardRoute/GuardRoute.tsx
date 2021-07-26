import React, { ReactNode } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { BlockchainNetworkId } from '../../common/types';
import { Connect } from '../../components/Connect';
import { UnsupportedNetwork } from '../../components/UnsupportedNetwork/UnsupportedNetwork';
import { DefaultLayout } from '../../modules/layout/components/DefautLayout';
import { useGuardRoute } from './useGuardRoute';

export interface INetwork {
  title: string;
  icon: ReactNode;
  chainId: BlockchainNetworkId;
}

export interface IGuardRoute extends RouteProps {
  availableNetworks: number[];
}

export const GuardRoute = ({
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
      <Connect networks={filteredNetworks} />
    </DefaultLayout>
  );
};
