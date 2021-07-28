import loadable, { LoadableComponent } from '@loadable/component';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  ABOUT_AETH_PATH,
  ABOUT_SMARTCHAIN_PATH,
  ANKR_IFRAME_PATH,
  BRIDGE_PATH,
  BRIDGE_RECOVERY_PATH,
  CONVERT_ROUTE,
  FEATURES_PATH,
  GOVERNANCE_CREATE_PROJECT_PATH,
  GOVERNANCE_PROJECT_LIST_PATH,
  GOVERNANCE_PROJECT_ROUTE,
  INDEX_PATH,
  isMainnet,
  PROVIDER_CREATE_NODE_PATH,
  PROVIDER_DEPOSIT_LIST_PATH,
  PROVIDER_DEPOSIT_ROUTE,
  PROVIDER_MAIN_PATH,
  PROVIDER_NODE_LIST_PATH,
  STAKER_AVALANCHE_PATH,
  STAKER_BNB_PATH,
  STAKER_DASHBOARD_BNB_ROUTE,
  STAKER_DASHBOARD_PATH,
  STAKER_STAKE_BNB_ROUTE,
  STAKER_STAKE_DOT_ROUTE,
  STAKER_STAKE_PATH,
} from './common/const';
import { BlockchainNetworkId } from './common/types';
import { PageNotFound } from './components/PageNotFound';
import { QueryLoadingAbsolute } from './components/QueryLoading/QueryLoading';
import { withDefaultLayout } from './modules/layout';
import { GuardRoute } from './UiKit/GuardRoute';
import { BinanceGuardRoute } from './UiKit/GuardRoute/BinanceGuardRoute';
import { PrivateRoute } from './UiKit/PrivateRoute';

const LoadableOverviewContainer = withDefaultLayout(
  loadable(async () => import('./modules/lobby').then(module => module.Lobby), {
    fallback: <QueryLoadingAbsolute />,
  }) as LoadableComponent<any>,
);

const ProviderContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/provider').then(module => module.Provider),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const TopUpContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/provider/screens/Deposit').then(
        module => module.Deposit,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const CreateBeaconChainContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/provider/screens/CreateNode').then(
        module => module.CreateNode,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const FeaturesListContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/features/FeaturesList').then(
        module => module.FeaturesList,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const StakerDashboardContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/stake/screens/StakerDashboard').then(
        module => module.StakerDashboard,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const StakerDashboardBnbContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/stake-bnb/screens/StakerDashboardBnb').then(
        module => module.StakerDashboardBnb,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const WalletListBnbContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/stake-bnb/screens/WalletListBnb').then(
        module => module.WalletListBnb,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const StakerContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/stake/screens/Stake').then(module => module.Stake),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const StakerDotContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/stake/screens/StakeDot').then(
        module => module.StakeDot,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const StakerBnbContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/stake-bnb/screens/StakeBnb').then(
        module => module.StakeBnb,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const LoadableAvalancheContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/stake-avax/screens/StakeAvax').then(
        module => module.StakeAvax,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const GovernanceListContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/governance/ProjectList').then(
        module => module.ProjectList,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const CreateProjectContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/governance/CreateProject').then(
        module => module.CreateProject,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const ProjectContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/governance/Project').then(module => module.Project),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const AboutAethContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/about-aeth').then(module => module.AboutAeth),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const LoadableIframeContainer = withDefaultLayout(
  loadable(
    async () => import('./modules/iframe').then(module => module.Iframe),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const LoadableConvertContainer = loadable(
  async () =>
    import('./modules/convert/screens/Convert').then(module => module.Convert),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableBridgeContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/cross-chain-bridge').then(module => module.Bridge),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const LoadableBridgeRecoverContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/cross-chain-bridge').then(
        module => module.BridgeRecovery,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const LoadableAboutSmartchainContainer = withDefaultLayout(
  loadable(
    async () =>
      import('./modules/convert/screens/AboutSmartchain').then(
        module => module.AboutSmartchain,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

export function Routes() {
  return (
    <Switch>
      <Route path={INDEX_PATH} exact component={LoadableOverviewContainer} />

      <PrivateRoute
        path={PROVIDER_CREATE_NODE_PATH}
        component={CreateBeaconChainContainer}
        exact
      />

      <Route path={ANKR_IFRAME_PATH} component={LoadableIframeContainer} />

      <PrivateRoute
        path={[PROVIDER_DEPOSIT_ROUTE]}
        component={TopUpContainer}
        exact
      />

      <GuardRoute
        path={[
          PROVIDER_MAIN_PATH,
          PROVIDER_NODE_LIST_PATH,
          PROVIDER_DEPOSIT_LIST_PATH,
        ]}
        exact
        component={ProviderContainer}
        availableNetworks={[
          isMainnet ? BlockchainNetworkId.mainnet : BlockchainNetworkId.goerli,
        ]}
      />

      <Route exact path={FEATURES_PATH} component={FeaturesListContainer} />

      <GuardRoute
        path={STAKER_DASHBOARD_PATH}
        component={StakerDashboardContainer}
        exact
        availableNetworks={[
          isMainnet ? BlockchainNetworkId.mainnet : BlockchainNetworkId.goerli,
          isMainnet
            ? BlockchainNetworkId.smartchain
            : BlockchainNetworkId.smartchainTestnet,
        ]}
      />

      <BinanceGuardRoute
        path={STAKER_DASHBOARD_BNB_ROUTE}
        component={StakerDashboardBnbContainer}
        exact
        availableNetworks={[
          isMainnet
            ? BlockchainNetworkId.smartchain
            : BlockchainNetworkId.smartchainTestnet,
        ]}
      />

      <BinanceGuardRoute
        path={STAKER_BNB_PATH}
        component={WalletListBnbContainer}
        exact
        availableNetworks={[
          isMainnet
            ? BlockchainNetworkId.smartchain
            : BlockchainNetworkId.smartchainTestnet,
        ]}
      />

      <PrivateRoute
        path={STAKER_STAKE_BNB_ROUTE}
        component={StakerBnbContainer}
      />

      <GuardRoute
        path={STAKER_AVALANCHE_PATH}
        component={LoadableAvalancheContainer}
        exact
        availableNetworks={[
          isMainnet
            ? BlockchainNetworkId.avalanche
            : BlockchainNetworkId.avalancheTestnet,
          isMainnet ? BlockchainNetworkId.mainnet : BlockchainNetworkId.goerli,
        ]}
      />

      <GuardRoute
        path={STAKER_STAKE_PATH}
        component={StakerContainer}
        availableNetworks={[
          isMainnet ? BlockchainNetworkId.mainnet : BlockchainNetworkId.goerli,
          isMainnet
            ? BlockchainNetworkId.smartchain
            : BlockchainNetworkId.smartchainTestnet,
        ]}
      />

      <GuardRoute
        path={STAKER_STAKE_DOT_ROUTE}
        component={StakerDotContainer}
        // todo: fill with actual networks
        availableNetworks={[
          isMainnet ? BlockchainNetworkId.mainnet : BlockchainNetworkId.goerli,
        ]}
      />

      <GuardRoute
        path={GOVERNANCE_PROJECT_LIST_PATH}
        component={GovernanceListContainer}
        exact
        availableNetworks={[
          isMainnet ? BlockchainNetworkId.mainnet : BlockchainNetworkId.goerli,
        ]}
      />

      <PrivateRoute
        path={GOVERNANCE_CREATE_PROJECT_PATH}
        component={CreateProjectContainer}
        exact
      />

      <PrivateRoute
        path={GOVERNANCE_PROJECT_ROUTE}
        component={ProjectContainer}
        exact
      />

      <Route path={ABOUT_AETH_PATH} component={AboutAethContainer} exact />

      <Route
        path={ABOUT_SMARTCHAIN_PATH}
        component={LoadableAboutSmartchainContainer}
        exact
      />

      <GuardRoute
        path={CONVERT_ROUTE}
        component={LoadableConvertContainer}
        exact
        availableNetworks={[
          isMainnet
            ? BlockchainNetworkId.smartchain
            : BlockchainNetworkId.smartchainTestnet,
        ]}
      />

      <Route path={BRIDGE_PATH} component={LoadableBridgeContainer} exact />

      <Route
        path={BRIDGE_RECOVERY_PATH}
        component={LoadableBridgeRecoverContainer}
        exact
      />

      <Route component={withDefaultLayout(PageNotFound)} />
    </Switch>
  );
}
