import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Router } from 'react-router';
import { AppContext } from '../../src/components/AppBase/AppContext';
import { mainTheme } from '../../src/common/themes/mainTheme';
import { locales } from '../../src/common/locales';
import { ReactReduxContext, Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { createRootReducer } from '../../src/store/reducers';
import { createStore } from 'redux';

const history = createMemoryHistory();

// create dead store (reducers only)
const store = createStore(createRootReducer(history));

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
      <Provider store={store} context={ReactReduxContext}>
        <MuiThemeProvider theme={mainTheme}>
          <CssBaseline />
          <Router history={history}>
            <div style={styles}>{enabled && children}</div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    </AppContext.Provider>
  );
};
