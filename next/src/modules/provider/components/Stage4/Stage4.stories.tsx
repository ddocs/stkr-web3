import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Stage4Component } from './Stage4';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const Stage4Story = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Stage4Component />
    </div>
  );
};

export const Stage4Example = () => <Stage4Story />;

export default {
  title: 'modules/provider/component/Stage4',
};
