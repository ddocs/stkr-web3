import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Lobby } from './Lobby';
import { DefaultLayoutComponent } from '../layout/components/DefautLayout/DefautLayout';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const LobbyStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <DefaultLayoutComponent isAuth={false}>
        <Lobby />
      </DefaultLayoutComponent>
    </div>
  );
};

export const LobbyExample = () => <LobbyStory />;

export default {
  title: 'modules/Lobby',
};
