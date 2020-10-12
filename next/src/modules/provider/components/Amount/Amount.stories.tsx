import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Amount } from './Amount';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const AmountStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Amount caption="Your ANKR balance" value={100000} />
    </div>
  );
};

export const AmountExample = () => <AmountStory />;

export default {
  title: 'modules/provider/component/Amount',
};
