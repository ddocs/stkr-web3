import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { CreateBeaconChain } from './CreateBeaconChain';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const CreateBeaconChainStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <CreateBeaconChain />
    </div>
  );
};

export const CreateBeaconChainExample = () => <CreateBeaconChainStory />;

export default {
  title: 'modules/provider/CreateBeaconChain',
};
