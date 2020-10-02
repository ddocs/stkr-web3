import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Lobby } from './Lobby';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const LobbyStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Lobby />
    </div>
  );
};

export const LobbyExample = () => <LobbyStory />;

export default {
  title: 'modules/Lobby',
};
