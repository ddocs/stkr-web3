import React from 'react';

import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Tabs } from './Tabs';

const useStyles = makeStyles<Theme>(theme => ({
  block: {
    width: 190,
  },
}));

const TabsStory = () => {
  const classes = useStyles();

  const TABS = [
    { label: 'navigation.staker', value: 'staker', href: '/staker' },
    { label: 'navigation.provider', value: 'provider', href: '/' },
  ];

  return (
    <div className={classes.block}>
      <Tabs values={TABS} />
    </div>
  );
};

export const TabsExample = () => <TabsStory />;

export default {
  title: 'modules/Layout/components/Tabs',
};
