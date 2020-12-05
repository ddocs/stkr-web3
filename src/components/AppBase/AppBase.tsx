import React, { ReactNode, useEffect, useState } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import intl from 'react-intl-universal';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { locales } from '../../common/locales';
import { mainTheme } from '../../common/themes/mainTheme';
import { QueryLoadingCentered } from '../QueryLoading/QueryLoading';
import { ReactReduxContext } from 'react-redux';
import '../../common/fonts/stylesheet.css';
import { historyInstance } from '../../common/utils/historyInstance';
import { useLocale } from '../../common/utils/useLocale';

interface IAppBaseProps {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBaseProps) => {
  const [initDone, setInitDone] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    setInitDone(false);
    intl
      .init({
        currentLocale: locale,
        locales,
        fallbackLocale: 'en-US',
      })
      .then(() => {
        setInitDone(true);
      });
  }, [locale]);

  return (
    <MuiThemeProvider theme={mainTheme}>
      <CssBaseline />

      {!initDone ? (
        <QueryLoadingCentered />
      ) : (
        <ConnectedRouter history={historyInstance} context={ReactReduxContext}>
          {children}
        </ConnectedRouter>
      )}
    </MuiThemeProvider>
  );
};
