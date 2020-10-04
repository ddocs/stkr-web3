import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { AppContext } from '../../src/components/AppBase/AppContext';
import { mainTheme } from '../../src/common/themes/mainTheme';
import { locales } from '../../src/common/locales';

const history = createMemoryHistory();

const init = (locale, translations = locales) =>
  intl.init({
    currentLocale: locale,
    locales: translations,
    commonLocaleDataUrls: {},
  });

export const AppShell = ({ children, locale = 'en-US' }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    init(locale).then(() => setEnabled(true));
  }, []);

  const styles = {
    backgroundColor: '#0F0F0F',
    width: '100%',
    minHeight: '100vh',
    padding: '16px',
    boxSizing: 'border-box',
  };

  return (
    <AppContext.Provider value={{ locale }}>
      <MuiThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Router history={history}>
          <div style={styles}>{enabled && children}</div>
        </Router>
      </MuiThemeProvider>
    </AppContext.Provider>
  );
};
