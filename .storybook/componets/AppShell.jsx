import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMemoryHistory } from 'history';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Provider, ReactReduxContext } from 'react-redux';
import { Router } from 'react-router';
import { locales } from '../../src/common/locales';
import { mainTheme } from '../../src/common/themes/mainTheme';
import { createApplicationStore } from '../../src/store/createStore';

const history = createMemoryHistory();

// create dead store (reducers only)
const { store } = createApplicationStore({ history });

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
    <Provider store={store} context={ReactReduxContext}>
      <MuiThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Router history={history}>
          <div style={styles}>{enabled && children}</div>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};
