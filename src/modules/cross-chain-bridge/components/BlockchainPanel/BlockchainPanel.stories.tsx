/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BlockchainIcons } from '../../const';
import { BlockchainPanel, IBlockchainPanelProps } from './BlockchainPanel';

export default {
  title: 'modules/CrossChainBridge/components/BlockchainPanel',
};

export const Default = () => {
  const onClick = () => console.log('click');

  return (
    <BlockchainPanel
      icon={BlockchainIcons.aEth}
      title="Ethereum Mainnet"
      onClick={onClick}
    />
  );
};

export const WithSubtitle = () => {
  const onClick = () => console.log('click');

  return (
    <BlockchainPanel
      subTitle="From"
      icon={BlockchainIcons.aEth}
      title="Ethereum Mainnet"
      onClick={onClick}
    />
  );
};

export const WithSelect = () => {
  const items: IBlockchainPanelProps['dropdownItems'] = [
    {
      label: 'aETH',
      icon: BlockchainIcons.aEth,
      value: 'aETH',
    },
    {
      label: 'fETH',
      icon: BlockchainIcons.aEth,
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
