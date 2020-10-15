import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { ProviderAlreadyComponent } from './ProviderDashboard';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const ProviderDashboardStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <ProviderAlreadyComponent
        totalStakersInEthereum={64}
        totalStakers={2}
        score={8}
      />
    </div>
  );
};

export const ProviderDashboardExample = () => <ProviderDashboardStory />;

export default {
  title: 'modules/provider/ProviderDashboard',
};
