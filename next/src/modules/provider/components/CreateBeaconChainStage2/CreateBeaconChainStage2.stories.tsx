import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { CreateBeaconChainStage2Component } from './CreateBeaconChainStage2';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const CreateBeaconChainStage2Story = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <CreateBeaconChainStage2Component />
    </div>
  );
};

export const CreateBeaconChainStage2Example = () => (
  <CreateBeaconChainStage2Story />
);

export default {
  title: 'modules/provider/component/CreateBeaconChainStage2',
};
