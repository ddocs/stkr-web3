import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Logotype } from './Logotype';

const useStyles = makeStyles<Theme>(theme => ({
  block: {
    display: 'inline-block',
  },
}));

const LogotypeStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Logotype />
    </div>
  );
};

export const LogotypeExample = () => <LogotypeStory />;

export default {
  title: 'modules/Layout/components/Logotype',
};
