import React from 'react';
import { Routes } from './Routes';
import { AppBase } from './components/AppBase/AppBase';
import { NoSsr } from '@material-ui/core';
import { Notifications } from './components/Notifications';
import { persistor, store } from './store';
import { Provider, ReactReduxContext } from 'react-redux';
import { QueryLoadingCentered } from './components/QueryLoading/QueryLoading';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store} context={ReactReduxContext}>
      <PersistGate loading={<QueryLoadingCentered />} persistor={persistor}>
        <AppBase>
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
