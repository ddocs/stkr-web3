import React from 'react';
import { generatePath } from 'react-router';
import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoadingAbsolute } from '../../components/QueryLoading/QueryLoading';
import { INDEX_PATH, isMainnet } from '../../common/const';
import { withDefaultLayout } from '../layout';
import { GuardRoute } from '../../UiKit/GuardRoute';
import { BlockchainNetworkId } from '../../common/types';

const STAKE_DOT_ROUTE = `${INDEX_PATH}/:network`;

export enum ParachainNetwork {
  DOT = 'DOT',
  KSM = 'KSM',
  WND = 'WND',
  ROC = 'ROC',
}

export const StakeDotRoutesConfig = {
  dashboard: {
    path: STAKE_DOT_ROUTE,
    generatePath: (network: ParachainNetwork) =>
      generatePath(STAKE_DOT_ROUTE, { network }),
    useParams: () => {
      return {};
    },
  },
};

const StakeDotContainer = withDefaultLayout(
  loadable(
    async () => import('./screens/StakeDot').then(module => module.StakeDot),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

export const StakeDotRoutes = () => {
  return (
    <GuardRoute
      availableNetworks={[
        isMainnet ? BlockchainNetworkId.mainnet : BlockchainNetworkId.goerli,
      ]}
      needPolkadotExtension
      path={STAKE_DOT_ROUTE}
      component={StakeDotContainer}
      exact
    />
  );
};
