import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Stage6Component } from './Stage6';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const Stage6Story = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Stage6Component nextStep={() => alert('finish')} />
    </div>
  );
};

export const Stage6Example = () => <Stage6Story />;

export default {
  title: 'modules/provider/component/Stage6',
};
