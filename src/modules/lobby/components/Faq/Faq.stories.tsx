import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { MuiThemeProvider, Theme } from '@material-ui/core';
import { Faq } from './Faq';
import { invertTheme } from '../../../../common/themes/invertTheme';

const useStyles = makeStyles<Theme>(() => ({
  block: {},
}));

const FaqStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <MuiThemeProvider theme={invertTheme}>
        <Faq />
      </MuiThemeProvider>
    </div>
  );
};

export const FaqExample = () => <FaqStory />;

export default {
  title: 'modules/Lobby/component/Faq',
};
