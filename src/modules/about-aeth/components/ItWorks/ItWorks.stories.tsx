/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { ItWorks } from './ItWorks';

const DefaultStory = () => {
  return <ItWorks />;
};

export const Default = () => <DefaultStory />;

export default {
  title: 'modules/AboutAeth/component/ItWorks',
};
