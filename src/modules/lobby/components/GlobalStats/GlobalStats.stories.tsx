/* eslint-disable import/no-anonymous-default-export */
import BigNumber from 'bignumber.js';
import React from 'react';
import { GlobalStatsComponent } from './GlobalStats';

const DefaultStory = () => {
  return (
    <GlobalStatsComponent
      totalStakedEthereum={new BigNumber('123665')}
      totalStakers={30}
    />
  );
};

export const Default = () => <DefaultStory />;

export default {
  title: 'modules/Lobby/component/GlobalStats',
};
