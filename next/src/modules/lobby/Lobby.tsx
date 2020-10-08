import * as React from 'react';
import { useLobbyStyles } from './LobbyStyles';
import { Promo } from './components/Promo';
import { Pool } from './components/Pool';
import { Calculate } from './components/Calculate';
import { Marketing } from './components/Marketing';

interface ILobbyProps {}

export const Lobby = () => {
  const classes = useLobbyStyles();
  return (
    <div className={classes.component}>
      <Promo />
      <Pool className={classes.pool} />
      <Calculate className={classes.calculate} />
      <Marketing className={classes.marketing} />
    </div>
  );
};
