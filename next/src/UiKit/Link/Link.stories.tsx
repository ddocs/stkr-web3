import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { NavLink } from './Link';

const useStyles = makeStyles<Theme>(() => ({
  block: {
    padding: 16,
  },

  button: {
    marginRight: 16,
  },
}));

const LinkStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <NavLink className={classes.button} href="#">
        Navigation link
      </NavLink>
      <NavLink className={classes.button} href="https://www.ankr.com/">
        External link
      </NavLink>
    </div>
  );
};

export const LinkExample = () => <LinkStory />;

export default {
  title: 'UiKit/Link',
};
