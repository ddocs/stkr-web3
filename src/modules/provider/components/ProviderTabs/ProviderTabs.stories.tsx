import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { ProviderTabs } from './ProviderTabs';

const useStyles = makeStyles<Theme>(theme => ({
  block: {
    height: '80vh',
  },
}));

const ProviderTabsStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <ProviderTabs />
    </div>
  );
};

export const ProviderTabsExample = () => <ProviderTabsStory />;

export default {
  title: 'modules/provider/component/ProviderTabs',
};
