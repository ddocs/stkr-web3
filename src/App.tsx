import { NoSsr } from '@material-ui/core';
import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppBase } from './components/AppBase/AppBase';
import { Notifications } from './components/Notifications';
import { QueryLoadingCentered } from './components/QueryLoading/QueryLoading';
import { ScrollToTop } from './components/ScrollToTop';
import { Routes } from './Routes';
import { persistor, store } from './store';

function App() {
  return (
    <Provider store={store} context={ReactReduxContext}>
      <PersistGate loading={<QueryLoadingCentered />} persistor={persistor}>
        <AppBase>
          <ScrollToTop />
          <Routes />
          <NoSsr>
            <Notifications />
          </NoSsr>
        </AppBase>
      </PersistGate>
    </Provider>
  );
}

export default App;
