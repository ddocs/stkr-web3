import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Stage1Component } from './Stage1';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const Stage1Story = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Stage1Component onSubmit={() => alert('to next stage')} />
    </div>
  );
};

export const Stage1Example = () => <Stage1Story />;

export default {
  title: 'modules/provider/component/Stage1',
};
