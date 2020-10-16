import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { CreateMicropoolStage2Component } from './CreateMicropoolStage2';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const CreateMicropoolStage2Story = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <CreateMicropoolStage2Component />
    </div>
  );
};

export const CreateMicropoolStage2Example = () => (
  <CreateMicropoolStage2Story />
);

export default {
  title: 'modules/provider/component/CreateMicropoolStage2',
};
