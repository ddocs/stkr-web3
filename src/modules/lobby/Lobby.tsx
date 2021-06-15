import { MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { invertTheme } from '../../common/themes/invertTheme';
import { Services } from '../../components/Services';
import { UserActions } from '../../store/actions/UserActions';
import { AethBanner } from './components/AethBanner';
import { BecomeProvider } from './components/BecomeProvider';
import { Calculate } from './components/Calculate';
import { Faq } from './components/Faq';
import { Features } from './components/Features';
import { Promo } from './components/Promo';
import { VideoTutorial } from './components/VideoTutorial';
import { useLobbyStyles } from './LobbyStyles';

export const Lobby = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserActions.fetchGlobalStats());
  }, [dispatch]);
  const classes = useLobbyStyles();

  return (
    <>
      <Promo />
      <Features />
      <VideoTutorial />
      <AethBanner />
      <Calculate />
      <Services className={classes.services} />
      <BecomeProvider />
      <MuiThemeProvider theme={invertTheme}>
        <Faq />
      </MuiThemeProvider>
    </>
  );
};
