/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { Blockchain } from '../../../../common/types';
import { Bridge, IBridgeProps } from './Bridge';

export default {
  title: 'modules/CrossChainBridge/components/Bridge',
};

const DefaultStory = ({ isConnected }: Pick<IBridgeProps, 'isConnected'>) => {
  const onConnectClick = () => console.log('connect');
  const [fromBlockchain, setFromBlockchain] = useState(Blockchain.ethereum);
  const [toBlockchain, setToBlockchain] = useState(Blockchain.binance);
  const onSwapClick = () => {
    setFromBlockchain(toBlockchain);
    setToBlockchain(fromBlockchain);
  };

  return (
    <Bridge
      fromBlockchain={fromBlockchain}
      toBlockchain={toBlockchain}
      onConnectClick={onConnectClick}
      onSwapClick={onSwapClick}
      isConnected={isConnected}
    />
  );
};

export const Default = () => <DefaultStory />;
export const Connected = () => <DefaultStory isConnected />;
