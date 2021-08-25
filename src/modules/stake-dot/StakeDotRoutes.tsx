import { withDefaultLayout } from '../layout';
import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoadingAbsolute } from '../../components/QueryLoading/QueryLoading';
import React from 'react';
import { Route } from 'react-router-dom';
import { PARACHAIN_BONDS } from '../../common/const';
import { generatePath } from 'react-router';

const STAKE_DOT_ROUTE = `${PARACHAIN_BONDS}/stake/:network`;

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

export function StakeDotRoutes() {
  return (
    <>
      <Route path={STAKE_DOT_ROUTE} component={StakeDotContainer} exact />
    </>
  );
}
