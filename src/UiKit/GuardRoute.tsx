import React, { ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStoreState } from '../store/reducers';
import { Route } from 'react-router-dom';
import { withDefaultLayout } from '../modules/layout';
import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoadingAbsolute } from '../components/QueryLoading/QueryLoading';
import { BlockchainNetworkId } from '../common/types';
import { ReactComponent as EthereumMainnetIcon } from '../common/assets/ethereumMainnetIcon.svg';
import { ReactComponent as BinanceSmartChainIcon } from '../common/assets/binanceSmartChainIcon.svg';
import { ReactComponent as AvaxcIcon } from '../common/assets/avaxcIcon.svg';
import { t } from '../common/utils/intl';
import { useLocaleMemo } from '../common/hooks/useLocaleMemo';

const ConnectContainer = withDefaultLayout(
  loadable(
    async () =>
      import('../components/Connect/Connect').then(module => module.Connect),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

const UnsupportedNetworkContainer = withDefaultLayout(
  loadable(
    async () =>
      import('../components/UnsupportedNetwork/UnsupportedNetwork').then(
        module => module.UnsupportedNetwork,
      ),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

export interface INetwork {
  title: string;
  icon: ReactNode;
  chainId: BlockchainNetworkId;
}

const useNetworks = (): INetwork[] =>
  useLocaleMemo(
    () => [
      {
        title: t('connect.networks.ethereum-mainnet'),
        icon: <EthereumMainnetIcon />,
        chainId: BlockchainNetworkId.mainnet,
      },
      {
        title: t('connect.networks.ethereum-goerli'),
        icon: <EthereumMainnetIcon />,
        chainId: BlockchainNetworkId.goerli,
      },
      {
        title: t('connect.networks.binance-smart-chain'),
        icon: <BinanceSmartChainIcon />,
        chainId: BlockchainNetworkId.smartchain,
      },
      {
        title: t('connect.networks.smart-chain-testnet'),
        icon: <BinanceSmartChainIcon />,
        chainId: BlockchainNetworkId.smartchainTestnet,
      },
      {
        title: t('connect.networks.avax-chain'),
        icon: <AvaxcIcon />,
        chainId: BlockchainNetworkId.avalanche,
      },
      {
        title: t('connect.networks.avax-fuji-testnet'),
        icon: <AvaxcIcon />,
        chainId: BlockchainNetworkId.avalancheTestnet,
      },
    ],
    [],
  );

interface IGuardRoute extends RouteProps {
  availableNetworks: number[];
  component: any;
  path: string;
}

export const GuardRoute = (props: IGuardRoute) => {
  const { isConnected: isAuth, chainId } = useSelector(
    (state: IStoreState) => state.user,
  );

  const networks = useNetworks();

  const filteredNetworks = networks.filter(network =>
    props.availableNetworks.includes(network.chainId),
  );

  if (
    isAuth &&
    chainId !== undefined &&
    !props.availableNetworks.includes(chainId)
  ) {
    return <UnsupportedNetworkContainer networks={filteredNetworks} />;
  }

  if (isAuth) {
    return <Route {...props} />;
  }

  return <ConnectContainer {...props} networks={filteredNetworks} />;
};
