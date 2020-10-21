import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { SuccessComponent } from './Success';

const useStyles = makeStyles<Theme>(() => ({
  block: {
    margin: 8,
  },
}));

const SuccessStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <SuccessComponent />
    </div>
  );
};

export const SuccessExample = () => <SuccessStory />;

export default {
  title: 'modules/Lobby/component/Success',
};
