import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Calculate } from './Calculate';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const CalculateStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Calculate />
    </div>
  );
};

export const CalculateExample = () => <CalculateStory />;

export default {
  title: 'modules/Lobby/component/Calculate',
};
