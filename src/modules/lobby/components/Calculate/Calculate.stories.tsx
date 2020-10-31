import React from 'react';
import { Calculate } from './Calculate';
import { invertTheme } from '../../../../common/themes/invertTheme';
import { MuiThemeProvider } from '@material-ui/core';

const CalculateStory = () => {
  return (
    <MuiThemeProvider theme={invertTheme}>
      <Calculate isConnected={false} />
    </MuiThemeProvider>
  );
};

export const CalculateExample = () => <CalculateStory />;

export default {
  title: 'modules/Lobby/component/Calculate',
};
