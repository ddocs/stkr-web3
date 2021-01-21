/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Advantages } from './Advantages';

const DefaultStory = () => {
  return <Advantages />;
};

export const Default = () => <DefaultStory />;

export default {
  title: 'modules/AboutAeth/component/Advantages',
};
