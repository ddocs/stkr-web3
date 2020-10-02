import * as React from 'react';
import { useLobbyStyles } from './LobbyStyles';
import { Promo } from '../../components/Promo';
import { Pool } from '../../components/Pool';

interface ILobbyProps {}

export const Lobby = () => {
  const classes = useLobbyStyles();
  return (
    <div className={classes.component}>
      <Promo />
      <Pool className={classes.pool} />
    </div>
  );
};
