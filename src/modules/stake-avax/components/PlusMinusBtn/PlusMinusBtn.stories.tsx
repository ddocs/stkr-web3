/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { PlusMinusBtn } from './PlusMinusBtn';

export default {
  title: 'modules/AvaxStaking/components/PlusMinusBtn',
};

export const Default = () => {
  return <PlusMinusBtn isLoading={false} tooltip="Stake" />;
};
