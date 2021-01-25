/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Rewards } from './Rewards';

const DefaultStory = () => {
  return <Rewards />;
};

export const Default = () => <DefaultStory />;

export default {
  title: 'modules/AboutAeth/component/Rewards',
};
