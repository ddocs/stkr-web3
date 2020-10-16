import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { CreateMicropool } from './CreateMicropool';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const CreateMicropoolStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <CreateMicropool />
    </div>
  );
};

export const CreateMicropoolExample = () => <CreateMicropoolStory />;

export default {
  title: 'modules/provider/CreateMicropool',
};
