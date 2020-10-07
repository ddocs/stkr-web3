import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Stage8Component } from './Stage8';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const Stage8Story = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Stage8Component nextStep={() => alert('finish')} />
    </div>
  );
};

export const Stage8Example = () => <Stage8Story />;

export default {
  title: 'modules/provider/component/Stage8',
};
