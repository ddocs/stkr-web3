import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Stage5Component } from './Stage5';

const useStyles = makeStyles<Theme>(theme => ({
  block: {
    height: '80vh',
  },
}));

const Stage5Story = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Stage5Component
        nextStep={() => alert('to next stage')}
        displayName="Alexander"
        onCreateBeaconNode={() => alert('Create another beacon chain node')}
        micropool={undefined}
      />
    </div>
  );
};

export const Stage5Example = () => <Stage5Story />;

export default {
  title: 'modules/provider/component/Stage5',
};