/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BlockchainPanel, IBlockchainPanelProps } from './BlockchainPanel';

export default {
  title: 'modules/CrossChainBridge/components/BlockchainPanel',
};

export const Default = () => {
  const onClick = () => console.log('click');

  return (
    <BlockchainPanel icon="aEth" title="Ethereum Mainnet" onClick={onClick} />
  );
};

export const WithSubtitle = () => {
  const onClick = () => console.log('click');

  return (
    <BlockchainPanel
      subTitle="From"
      icon="aEth"
      title="Ethereum Mainnet"
      onClick={onClick}
    />
  );
};

export const WithSelect = () => {
  const items: IBlockchainPanelProps['dropdownItems'] = [
    {
      label: 'aETH',
      icon: 'aEth',
      value: 'aETH',
    },
    {
      label: 'fETH',
      icon: 'fEth',
      value: 'fETH',
    },
  ];

  return (
    <BlockchainPanel
      subTitle="From"
      icon={items[0].icon}
      title={items[0].label}
      dropdownItems={items}
    />
  );
};
