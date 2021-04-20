/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { Bridge, IBridgeProps } from './Bridge';

export default {
  title: 'modules/CrossChainBridge/components/Bridge',
};

const DefaultStory = ({ isConnected }: Pick<IBridgeProps, 'isConnected'>) => {
  const onConnectClick = () => console.log('connect');
  const [isToEth, setToEth] = useState(false);
  const onSwapClick = () => setToEth(value => !value);

  return (
    <Bridge
      isToEth={isToEth}
      onConnectClick={onConnectClick}
      onSwapClick={onSwapClick}
      isConnected={isConnected}
    />
  );
};

export const Default = () => <DefaultStory />;
export const Connected = () => <DefaultStory isConnected />;
