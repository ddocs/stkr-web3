import React from 'react';
import './App.css';
import { Routes } from './Routes';
import { AppBase } from './modules/common/components/AppBase/AppBase';

function App() {
  return (
    <AppBase>
      <Routes />
    </AppBase>
  );
}

export default App;
