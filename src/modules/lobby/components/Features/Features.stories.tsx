import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Features } from './Features';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const FeaturesStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Features />
    </div>
  );
};

export const FeaturesExample = () => <FeaturesStory />;

export default {
  title: 'modules/Lobby/component/FeaturesList',
};
