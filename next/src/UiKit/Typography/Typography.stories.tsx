import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import {
  Body2,
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  SmallTitle,
  Body1,
  SubTitle1,
} from './Typography';

const useStyles = makeStyles<Theme>(() => ({
  block: {
    padding: 16,
  },

  title: {
    marginBottom: 16,
  },
}));

const TypographyStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Headline1 className={classes.title} component="h1">
        Headline1
      </Headline1>
      <Headline2 className={classes.title} component="h2">
        Headline2
      </Headline2>
      <Headline3 className={classes.title} component="h3">
        Headline3
      </Headline3>
      <Headline4 className={classes.title} component="h4">
        Headline4
      </Headline4>
      <Headline5 className={classes.title} component="h5">
        Headline5
      </Headline5>
      <Headline6 className={classes.title} component="h6">
        Headline6
      </Headline6>
      <SubTitle1 className={classes.title} component="h6">
        Headline6
      </SubTitle1>
      <SmallTitle className={classes.title} component="span">
        SmallTitle
      </SmallTitle>
      <Body1 className={classes.title} component="p">
        Ankr is the blockchain infrastructure platform and marketplace
        connecting everyone from end-users, developers to enterprises.
      </Body1>
      <Body2 className={classes.title} component="p">
        Ankr is the blockchain infrastructure platform and marketplace
        connecting everyone from end-users, developers to enterprises.
      </Body2>
    </div>
  );
};

export const TypographyExample = () => <TypographyStory />;

export default {
  title: 'UiKit/Typography',
};
