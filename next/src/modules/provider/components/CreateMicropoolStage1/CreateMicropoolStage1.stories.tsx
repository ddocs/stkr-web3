import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { CreateMicropoolStage1Component } from './CreateMicropoolStage1';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const CreateMicropoolStage1Story = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <CreateMicropoolStage1Component
        nextStep={() => alert('to next stage')}
        beacon={[{ value: '1', label: 'Alex_Beacon_Node' }]}
      />
    </div>
  );
};

export const CreateMicropoolStage1Example = () => (
  <CreateMicropoolStage1Story />
);

export default {
  title: 'modules/provider/component/CreateMicropoolStage1',
};
