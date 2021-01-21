/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Services } from './Services';

const DefaultStory = () => {
  return <Services />;
};

export const Default = () => <DefaultStory />;

export default {
  title: 'modules/AboutAeth/component/Services',
};
