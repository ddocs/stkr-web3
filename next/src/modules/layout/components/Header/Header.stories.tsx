import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { HeaderComponent } from './Header';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const HeaderStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <HeaderComponent />
      <HeaderComponent isAuth={true} />
    </div>
  );
};

export const HeaderExample = () => <HeaderStory />;

export default {
  title: 'modules/Layout/Header',
};
