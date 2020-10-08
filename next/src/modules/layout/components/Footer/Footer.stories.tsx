import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { FooterComponent } from './Footer';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const FooterStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <FooterComponent isAuth={false} />
    </div>
  );
};

export const FooterExample = () => <FooterStory />;

export default {
  title: 'modules/Layout/components/Footer',
};
