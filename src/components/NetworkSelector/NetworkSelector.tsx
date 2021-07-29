import React from 'react';
import { useDispatch } from 'react-redux';
import { uid } from 'react-uid';
import { useConnect } from '../../common/hooks/useConnect';
import { switchNetwork } from '../../store/actions/switchNetwork';
import { INetwork } from '../../UiKit/GuardRoute';
import { NetworkSelectorItem } from './NetworkSelectorItem';
import { NetworkSelectorList } from './NetworkSelectorList';

interface INetworkSelector {
  networks: INetwork[];
}

export const NetworkSelector = ({ networks }: INetworkSelector) => {
  const dispatch = useDispatch();
  const { isAuth } = useConnect();

  const renderedItems = networks.map(network => {
    const onClick = () => {
      dispatch(switchNetwork(network.chainId));
    };

    return (
      <NetworkSelectorItem
        key={uid(network)}
        icon={network.icon}
        title={network.title}
        onClick={isAuth ? onClick : undefined}
        disabled={!isAuth}
      />
    );
  });

  return <NetworkSelectorList>{renderedItems}</NetworkSelectorList>;
};
