/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { ServicesItem } from './ServicesItem';

const DefaultStory = () => {
  return (
    <ServicesItem
      logo="metamask"
      text="Store aETH and connect with DeFi applications."
    />
  );
};

export const Default = () => <DefaultStory />;

export default {
  title: 'components/ServicesItem',
};
