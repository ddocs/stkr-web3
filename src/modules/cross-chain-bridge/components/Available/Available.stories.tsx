/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Available } from './Available';

export default {
  title: 'modules/CrossChainBridge/components/Available',
};

export const Default = () => {
  const onClick = () => {
    console.log('click');
  };
  return <Available value="10" network="BSC" onClaimClick={onClick} />;
};
