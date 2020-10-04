import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { PoolTableComponent } from './PoolTable';
import { POOL_DATA } from './mock';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const PoolTableStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <PoolTableComponent data={POOL_DATA} />
    </div>
  );
};

export const PoolTableExample = () => <PoolTableStory />;

export default {
  title: 'modules/Lobby/component/PoolTable',
};
