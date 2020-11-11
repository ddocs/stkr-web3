import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Links } from './Links';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const LinksStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Links />
    </div>
  );
};

export const LinksExample = () => <LinksStory />;

export default {
  title: 'modules/Layout/components/Links',
};
