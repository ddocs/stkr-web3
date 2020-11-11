import * as React from 'react';
import { Promo } from './components/Promo';
import { Calculate } from './components/Calculate';
import { Marketing } from './components/Marketing';
import BigNumber from 'bignumber.js';
import { useAuthentication } from '../../common/utils/useAuthentications';
import { Features } from './components/Features';
import { Roles } from './components/Roles';
import { BecomeProvider } from './components/BecomeProvider';
import { Faq } from './components/Faq';
import { invertTheme } from '../../common/themes/invertTheme';
import { MuiThemeProvider } from '@material-ui/core';

export const Lobby = () => {
  const { isConnected } = useAuthentication();

  return (
    <>
      <Promo />
      <MuiThemeProvider theme={invertTheme}>
        <Marketing />
      </MuiThemeProvider>
      <Features />
      <MuiThemeProvider theme={invertTheme}>
        <Calculate
          ethPrice={new BigNumber('374.94')}
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
