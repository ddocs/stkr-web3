import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Stage2Component } from './Stage2';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const Stage2Story = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Stage2Component nextStep={() => alert('to next stage')} />
    </div>
  );
};

export const Stage2Example = () => <Stage2Story />;

export default {
  title: 'modules/provider/component/Stage2',
};
