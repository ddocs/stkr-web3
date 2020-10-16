import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { ProviderDashboardComponent } from './ProviderDashboard';
import { MICRO_POOL_DATA } from '../../mock';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const ProviderDashboardStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <ProviderDashboardComponent
        totalStakersInEthereum={64}
        totalStakers={2}
        micropool={MICRO_POOL_DATA}
      />
    </div>
  );
};

export const ProviderDashboardExample = () => <ProviderDashboardStory />;

export default {
  title: 'modules/provider/ProviderDashboard',
};
