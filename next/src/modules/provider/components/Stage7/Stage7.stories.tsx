import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Stage7Component } from './Stage7';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const Stage7Story = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Stage7Component nextStep={() => alert('finish')} />
    </div>
  );
};

export const Stage7Example = () => <Stage7Story />;

export default {
  title: 'modules/provider/component/Stage7',
};
