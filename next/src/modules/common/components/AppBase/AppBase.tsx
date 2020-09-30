import React from 'react';
import intl from 'react-intl-universal';
import { CssBaseline } from '@material-ui/core';
import { AppContext } from './AppContext';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { locales } from '../../locales';
import { mainTheme } from '../../themes/mainTheme';
import { AppLoading } from '../AppLoading/AppLoading';
import { Router } from 'react-router';
import { historyInstance } from '../../utils/historyInstance';

interface IAppBaseProps {}

interface IAppBaseState {
  initDone: boolean;
  locale: 'en-US';
}

export class AppBase extends React.Component<IAppBaseProps, IAppBaseState> {
  constructor(props: any) {
    super(props);
    this.state = { initDone: false, locale: 'en-US' };
  }

  public componentDidMount(): void {
    this.loadLocales();
  }

  public render() {
    return (
      <AppContext.Provider value={{ locale: this.state.locale }}>
        <MuiThemeProvider theme={mainTheme}>
          <CssBaseline />
          <Router history={historyInstance}>
            {!this.state.initDone ? <AppLoading /> : this.props.children}
          </Router>
        </MuiThemeProvider>
      </AppContext.Provider>
    );
  }

  protected loadLocales = () => {
    intl
      .init({
        currentLocale: this.state.locale,
        locales,
      })
      .then(() => {
        this.setState({ initDone: true, locale: 'en-US' });
      });
  };
}
