import * as React from 'react';
import { useLobbyStyles } from './LobbyStyles';
import { Promo } from '../../components/Promo';

interface ILobbyProps {}

export const Lobby = () => {
  const classes = useLobbyStyles();
  return (
    <div className={classes.root}>
      <Promo />
    </div>
  );
};
