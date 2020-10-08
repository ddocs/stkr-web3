import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Marketing } from './Marketing';

const useStyles = makeStyles<Theme>(() => ({
  block: {},
}));

const MarketingStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <Marketing />
    </div>
  );
};

export const MarketingExample = () => <MarketingStory />;

export default {
  title: 'modules/Lobby/component/Marketing',
};
