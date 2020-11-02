import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import intl from 'react-intl-universal';
import { CssBaseline } from '@material-ui/core';
import { AppContext } from './AppContext';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { locales } from '../../common/locales';
import { mainTheme } from '../../common/themes/mainTheme';
import { QueryLoadingCentered } from '../QueryLoading/QueryLoading';
import { Provider, ReactReduxContext } from 'react-redux';
import { persistor, store } from '../../store';
import '../../common/fonts/stylesheet.css';
import { PersistGate } from 'redux-persist/integration/react';
import { historyInstance } from '../../common/utils/historyInstance';
import { StkrSdk } from '../../modules/api';
import {
  DEVELOP_CONFIG,
  GOERLI_CONFIG,
  LOCAL_CONFIG,
} from '../../modules/api/config';

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
    const env = process.env.REACT_APP_STKR_ENV
      ? process.env.REACT_APP_STKR_ENV
      : 'develop';
    console.log(`Current environment is: ${env}`);
    if (env === 'goerli') {
      StkrSdk.factoryDefault(GOERLI_CONFIG);
    } else if (env === 'develop') {
      StkrSdk.factoryDefault(DEVELOP_CONFIG);
    } else {
      StkrSdk.factoryDefault(LOCAL_CONFIG);
    }

    this.loadLocales();
  }

  public render() {
    return (
      <AppContext.Provider value={{ locale: this.state.locale }}>
        <Provider store={store} context={ReactReduxContext}>
          <MuiThemeProvider theme={mainTheme}>
            <CssBaseline />
            <PersistGate
              loading={<QueryLoadingCentered />}
              persistor={persistor}
            >
              <ConnectedRouter
                history={historyInstance}
                context={ReactReduxContext}
              >
                {!this.state.initDone ? (
                  <QueryLoadingCentered />
                ) : (
                  this.props.children
                )}
              </ConnectedRouter>
            </PersistGate>
          </MuiThemeProvider>
        </Provider>
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