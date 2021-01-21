/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import { AboutAeth } from './AboutAeth';
import { DefaultLayoutComponent } from '../layout/components/DefautLayout/DefautLayout';

const DefaultStory = () => {
  return (
    <DefaultLayoutComponent isAuth={false}>
      <AboutAeth />
    </DefaultLayoutComponent>
  );
};

export const Default = () => <DefaultStory />;

export default {
  title: 'modules/AboutAeth',
};
