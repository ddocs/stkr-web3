import * as React from 'react';
import { useLobbyStyles } from './LobbyStyles';
import { Promo } from './components/Promo';
import { Pool } from './components/Pool';
import { Calculate } from './components/Calculate';
import { Marketing } from './components/Marketing';
import { useAuthentication } from '../../common/utils/useAuthentications';

interface ILobbyProps {}

export const Lobby = () => {
  const classes = useLobbyStyles();
  const { isAuthenticated } = useAuthentication();
  return (
    <div className={classes.component}>
      <Promo />
      <Pool isAuthenticated={isAuthenticated} className={classes.pool} />
      <Calculate
        isAuthenticated={isAuthenticated}
        className={classes.calculate}
      />
      <Marketing className={classes.marketing} />
    </div>
  );
};
