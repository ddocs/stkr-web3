import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { SubscribeComponent } from './Subscribe';

const useStyles = makeStyles<Theme>(() => ({
  block: {
    margin: 8,
  },
}));

const SubscribeStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <SubscribeComponent onSubmit={() => null} disabled={false} />
    </div>
  );
};

export const SubscribeExample = () => <SubscribeStory />;

export default {
  title: 'modules/Lobby/component/Subscribe',
};
