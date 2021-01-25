/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Promo } from './Promo';

const DefaultStory = () => {
  return <Promo />;
};

export const Default = () => <DefaultStory />;

export default {
  title: 'modules/AboutAeth/component/Promo',
};
