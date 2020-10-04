import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { DefaultLayoutComponent } from './DefautLayout';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const DefaultLayoutStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <DefaultLayoutComponent></DefaultLayoutComponent>
    </div>
  );
};

export const DefaultLayoutExample = () => <DefaultLayoutStory />;

export default {
  title: 'modules/Layout/DefaultLayout',
};
