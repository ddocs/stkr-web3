import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Social } from './Social';

const useStyles = makeStyles<Theme>(() => ({
  block: {
    margin: 8,
  },

  content: {
    margin: 8,
    padding: 16,
  },
}));

const SocialStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <Social />
    </div>
  );
};

export const SocialExample = () => <SocialStory />;

export default {
  title: 'modules/Layout/components/Social',
};
