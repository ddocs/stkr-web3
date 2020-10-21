import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { EmptyList } from './EmptyList';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},

  content: {
    marginBottom: 16,
  },
}));

const EmptyListStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <EmptyList />
    </div>
  );
};

export const EmptyListExample = () => <EmptyListStory />;

export default {
  title: 'modules/provider/component/EmptyList',
};
