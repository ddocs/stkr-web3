import * as React from 'react';
import { useEffect } from 'react';
import { Promo } from './components/Promo';
import { Calculate } from './components/Calculate';
import { GlobalStats } from './components/GlobalStats';
import BigNumber from 'bignumber.js';
import { useAuthentication } from '../../common/utils/useAuthentications';
import { Features } from './components/Features';
import { Roles } from './components/Roles';
import { VideoTutorial } from './components/VideoTutorial';
import { BecomeProvider } from './components/BecomeProvider';
import { Faq } from './components/Faq';
import { invertTheme } from '../../common/themes/invertTheme';
import { MuiThemeProvider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { UserActions } from '../../store/actions/UserActions';
import { ETHEREUM_PRICE } from '../../common/const';
import { AethBanner } from './components/AethBanner';

export const Lobby = () => {
  const { isConnected } = useAuthentication();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserActions.fetchGlobalStats());
  }, [dispatch]);

  return (
    <>
      <Promo />
      <MuiThemeProvider theme={invertTheme}>
        <GlobalStats />
      </MuiThemeProvider>
      <VideoTutorial />
      <Features />
      <AethBanner />
      <MuiThemeProvider theme={invertTheme}>
        <Calculate
          ethPrice={new BigNumber(ETHEREUM_PRICE)}
          isConnected={isConnected}
        />
      </MuiThemeProvider>
      <Roles />
      <BecomeProvider />
      <MuiThemeProvider theme={invertTheme}>
        <Faq />
      </MuiThemeProvider>
    </>
  );
};
