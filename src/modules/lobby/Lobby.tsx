import { MuiThemeProvider } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ETHEREUM_PRICE, isMainnet } from '../../common/const';
import { invertTheme } from '../../common/themes/invertTheme';
import { useAuthentication } from '../../common/utils/useAuthentications';
import { UserActions } from '../../store/actions/UserActions';
import { AethBanner } from './components/AethBanner';
import { BecomeProvider } from './components/BecomeProvider';
import { Calculate } from './components/Calculate';
import { Faq } from './components/Faq';
import { Features } from './components/Features';
import { GlobalStats } from './components/GlobalStats';
import { Promo } from './components/Promo';
import { Roles } from './components/Roles';
import { VideoTutorial } from './components/VideoTutorial';

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
      {!isMainnet && <AethBanner />}
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
