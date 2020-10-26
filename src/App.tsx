import React from 'react';
import { Routes } from './Routes';
import { AppBase } from './components/AppBase/AppBase';
import { NoSsr } from '@material-ui/core';
import { Notifications } from './components/Notifications';

function App() {
  return (
    <AppBase>
      <Routes />
      <NoSsr>
        <Notifications />
      </NoSsr>
    </AppBase>
  );
}

export default App;
