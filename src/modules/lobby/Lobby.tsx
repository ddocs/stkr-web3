import * as React from 'react';
import { useLobbyStyles } from './LobbyStyles';
import { Promo } from './components/Promo';
import { Calculate } from './components/Calculate';
import { Marketing } from './components/Marketing';
import BigNumber from 'bignumber.js';
import { useAuthentication } from '../../common/utils/useAuthentications';
import { StayTuned } from './components/StayTuned';

const ENABLE_SUBSCRIPTION = false;

export const Lobby = () => {
  const classes = useLobbyStyles();
  const { isConnected } = useAuthentication();

  return (
    <div className={classes.component}>
      <Promo />
      <Calculate
        className={classes.calculate}
        ethPrice={new BigNumber('374.94')}
        isConnected={isConnected}
      />
      <StayTuned className={classes.stayTuned} />
      {ENABLE_SUBSCRIPTION && <Marketing className={classes.marketing} />}
    </div>
  );
};
