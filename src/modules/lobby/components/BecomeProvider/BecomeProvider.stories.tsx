import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { BecomeProvider } from './BecomeProvider';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const BecomeProviderStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <BecomeProvider />
    </div>
  );
};

export const BecomeProviderExample = () => <BecomeProviderStory />;

export default {
  title: 'modules/Lobby/component/BecomeProvider',
};
