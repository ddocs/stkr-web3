import * as React from 'react';
import { useLobbyStyles } from './LobbyStyles';
import { Promo } from './components/Promo';
import { Calculate } from './components/Calculate';
import { Marketing } from './components/Marketing';
import { useAuthentication } from '../../common/utils/useAuthentications';
import { WhatIs } from './components/WhatIs';

export const Lobby = () => {
  const classes = useLobbyStyles();
  const { isAuthenticated } = useAuthentication();
  return (
    <div className={classes.component}>
      <Promo />
      <WhatIs />
      <Calculate
        isAuthenticated={isAuthenticated}
        className={classes.calculate}
      />
      <Marketing className={classes.marketing} />
    </div>
  );
};
