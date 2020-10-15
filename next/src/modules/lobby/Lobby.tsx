import * as React from 'react';
import { useLobbyStyles } from './LobbyStyles';
import { Promo } from './components/Promo';
import { Calculate } from './components/Calculate';
import { Marketing } from './components/Marketing';
import { WhatIs } from './components/WhatIs';
import BigNumber from 'bignumber.js';
import { useAuthentication } from '../../common/utils/useAuthentications';

export const Lobby = () => {
  const classes = useLobbyStyles();
  const { isAuthenticated } = useAuthentication();
  return (
    <div className={classes.component}>
      <Promo />
      <WhatIs className={classes.whatIs} />
      <Calculate
        className={classes.calculate}
        ethPrice={new BigNumber('374.94')}
        isAuthenticated={isAuthenticated}
      />
      <Marketing className={classes.marketing} />
    </div>
  );
};
