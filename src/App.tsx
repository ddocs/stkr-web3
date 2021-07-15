import { NoSsr } from '@material-ui/core';
import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppBase } from './components/AppBase/AppBase';
import { Notifications } from './components/Notifications';
import { QueryLoadingAbsolute } from './components/QueryLoading/QueryLoading';
import { ScrollToTop } from './components/ScrollToTop';
import { ZendeskMounter } from './components/ZendeskMounter';
import { Routes } from './Routes';
import { PolkadotSlotAuctionRoutes } from './PolkadotSlotAuctionRoutes';
import { persistor, store } from './store';

function App() {
  return (
    <Provider store={store} context={ReactReduxContext}>
      <PersistGate loading={<QueryLoadingAbsolute />} persistor={persistor}>
        <AppBase>
          <ZendeskMounter />
          <ScrollToTop />
          {/* TODO remove === undefined */}
          {process.env.POLKADOT_SLOT_AUCTION === undefined ? (
            <PolkadotSlotAuctionRoutes />
          ) : (
            <Routes />
          )}
          <NoSsr>
            <Notifications />
          </NoSsr>
        </AppBase>
      </PersistGate>
    </Provider>
  );
}

export default App;
