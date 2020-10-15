import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { CreateBeaconChainStage1Component } from './CreateBeaconChainStage1';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const CreateBeaconChainStage1Story = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <CreateBeaconChainStage1Component
        onSubmit={() => alert('to next stage')}
      />
    </div>
  );
};

export const CreateBeaconChainStage1Example = () => (
  <CreateBeaconChainStage1Story />
);

export default {
  title: 'modules/provider/component/CreateBeaconChainStage1',
};
