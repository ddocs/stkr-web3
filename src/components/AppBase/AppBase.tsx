import React, { ReactNode, useEffect, useState } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import intl from 'react-intl-universal';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { ReactReduxContext } from 'react-redux';
import { create } from 'jss';
import preset from 'jss-preset-default';

import { locales } from '../../common/locales';
import { mainTheme } from '../../common/themes/mainTheme';
import { QueryLoadingAbsolute } from '../QueryLoading/QueryLoading';
import '../../common/fonts/stylesheet.css';
import { historyInstance } from '../../common/utils/historyInstance';
import { useLocale } from '../../common/utils/useLocale';

interface IAppBaseProps {
  children: ReactNode;
}

const createGenerateClassName = () => {
  let counter = 0;
  return () =>
    `c${
      Math.random().toString(36).substring(2, 4) +
      Math.random().toString(36).substring(2, 4)
    }-${counter++}`;
};
const jss = create(preset());

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
    <StylesProvider jss={jss} generateClassName={createGenerateClassName()}>
      <MuiThemeProvider theme={mainTheme}>
        <CssBaseline />

        {!initDone ? (
          <QueryLoadingAbsolute />
        ) : (
          <ConnectedRouter
            history={historyInstance}
            context={ReactReduxContext}
          >
            {children}
          </ConnectedRouter>
        )}
      </MuiThemeProvider>
    </StylesProvider>
  );
};
