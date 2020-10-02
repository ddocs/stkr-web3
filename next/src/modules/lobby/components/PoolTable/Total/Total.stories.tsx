import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Total } from './Total';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const TotalStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Total total={32} reward={1} />
    </div>
  );
};

export const TotalExample = () => <TotalStory />;

export default {
  title: 'modules/Lobby/component/PoolTable/Total',
};
