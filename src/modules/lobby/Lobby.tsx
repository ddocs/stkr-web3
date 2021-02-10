import { MuiThemeProvider } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ETHEREUM_PRICE } from '../../common/const';
import { invertTheme } from '../../common/themes/invertTheme';
import { useAuthentication } from '../../common/utils/useAuthentications';
import { Services } from '../../components/Services';
import { UserActions } from '../../store/actions/UserActions';
import { AethBanner } from './components/AethBanner';
import { BecomeProvider } from './components/BecomeProvider';
import { Calculate } from './components/Calculate';
import { Faq } from './components/Faq';
import { Features } from './components/Features';
import { GlobalStats } from './components/GlobalStats';
import { Promo } from './components/Promo';
import { VideoTutorial } from './components/VideoTutorial';
import { useLobbyStyles } from './LobbyStyles';

export const Lobby = () => {
  const { isConnected } = useAuthentication();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserActions.fetchGlobalStats());
  }, [dispatch]);
  const classes = useLobbyStyles();

  return (
    <>
      <Promo />
      <GlobalStats />
      <VideoTutorial />
      <Features />
      <AethBanner />
      <Calculate
        ethPrice={new BigNumber(ETHEREUM_PRICE)}
        isConnected={isConnected}
      />
      <Services className={classes.services} />
      <BecomeProvider />
      <MuiThemeProvider theme={invertTheme}>
        <Faq />
      </MuiThemeProvider>
    </>
  );
};
