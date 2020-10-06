import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Stage3Component } from './Stage3';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const Stage3Story = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Stage3Component nextStep={() => alert('to next stage')} />
    </div>
  );
};

export const Stage3Example = () => <Stage3Story />;

export default {
  title: 'modules/provider/component/Stage3',
};
