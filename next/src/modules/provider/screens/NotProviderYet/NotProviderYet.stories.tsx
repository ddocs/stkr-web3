import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { NotProviderYet } from './NotProviderYet';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const NotProviderYetStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <NotProviderYet />
    </div>
  );
};

export const NotProviderYetExample = () => <NotProviderYetStory />;

export default {
  title: 'modules/provider/NotProviderYet',
};
