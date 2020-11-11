import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { BackgroundColorProvider } from './BackgroundColorProvider';
import { Headline1, Body2 } from '../Typography';
import { Button } from '../Button';

const useStyles = makeStyles<Theme>(() => ({
  block: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 8,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    width: '100%',
    padding: 32,
    margin: 8,

    fontSize: 22,
  },

  title: {
    marginBottom: 16,
  },

  text: {
    marginBottom: 16,
  },

  navigation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  button: {
    marginRight: 16,
  },
}));

const BackgroundColorProviderStory = () => {
  const classes = useStyles();

  const content = (
    <>
      <Headline1 className={classes.title} component="h2">
        Headline1
      </Headline1>
      <Body2 className={classes.text} component="p">
        Ankr is the blockchain infrastructure platform and marketplace
        connecting everyone from end-users, developers to enterprises.
      </Body2>
      <div className={classes.navigation}>
        <Button className={classes.button}>Request Demo</Button>
        <Button className={classes.button} variant="outlined">
          Request Demo
        </Button>
        <Button className={classes.button} variant="text">
          Request Demo
        </Button>
        <Button className={classes.button} variant="text" color="primary">
          Request Demo
        </Button>
      </div>
    </>
  );

  return (
    <div className={classes.block}>
      <BackgroundColorProvider className={classes.content}>
        {content}
      </BackgroundColorProvider>
    </div>
  );
};

export const BackgroundColorProviderExample = () => (
  <BackgroundColorProviderStory />
);

export default {
  title: 'UiKit/BackgroundColorProvider',
};
