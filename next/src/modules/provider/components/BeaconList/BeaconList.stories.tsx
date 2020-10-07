import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { BeaconListComponent } from './BeaconList';
import { BEACON_NODE_DATA } from './mock';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const BeaconListStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <BeaconListComponent
        className={classes.content}
        data={BEACON_NODE_DATA}
      />
    </div>
  );
};

export const BeaconListExample = () => <BeaconListStory />;

export default {
  title: 'modules/provider/component/BeaconList',
};
