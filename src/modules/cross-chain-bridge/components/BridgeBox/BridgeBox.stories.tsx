/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BridgeBox } from './BridgeBox';

export default {
  title: 'modules/CrossChainBridge/components/BridgeBox',
};

const DefaultStory = () => {
  return <BridgeBox>BridgeBox</BridgeBox>;
};

export const Default = () => <DefaultStory />;
