/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Progress } from './Progress';

export default {
  title: 'modules/CrossChainBridge/components/Progress',
};

export const Default = () => {
  return (
    <Progress
      subTitle="1/24 blocks completed (~7 min left)"
      amount="5.3"
      amountType="aETH"
      address="0x63c6c732d603338AB1AeBA137aA79CDa6EFfb350"
    />
  );
};
