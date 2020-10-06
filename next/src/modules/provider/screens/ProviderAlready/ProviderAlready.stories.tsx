import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { ProviderAlready } from './ProviderAlready';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const ProviderAlreadyStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <ProviderAlready />
    </div>
  );
};

export const ProviderAlreadyExample = () => <ProviderAlreadyStory />;

export default {
  title: 'modules/provider/ProviderAlready',
};
