import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Pool } from './Pool';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const PoolStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Pool />
    </div>
  );
};

export const PoolExample = () => <PoolStory />;

export default {
  title: 'modules/Lobby/component/Pool',
};
