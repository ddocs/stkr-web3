/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Start } from './Start';

const DefaultStory = () => {
  return <Start />;
};

export const Default = () => <DefaultStory />;

export default {
  title: 'modules/AboutAeth/component/Start',
};
