import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { MuiThemeProvider, Theme } from '@material-ui/core';
import { Marketing } from './Marketing';
import { invertTheme } from '../../../../common/themes/invertTheme';

const useStyles = makeStyles<Theme>(() => ({
  block: {},
}));

const MarketingStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <MuiThemeProvider theme={invertTheme}>
        <Marketing />
      </MuiThemeProvider>
    </div>
  );
};

export const MarketingExample = () => <MarketingStory />;

export default {
  title: 'modules/Lobby/component/Marketing',
};
