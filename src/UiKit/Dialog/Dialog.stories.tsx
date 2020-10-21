import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Dialog } from './Dialog';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme>(() => ({
  block: {
    display: 'grid',

    width: '100%',
    minHeight: '50vh',
  },

  wrapper: {
    width: '100%',
    height: '100%',
  },

  content: {
    backgroundColor: 'red',
  },
}));

const DialogStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <Dialog open={true} onClose={() => null} minHeight={300}>
        Hello world!
      </Dialog>
    </div>
  );
};

export const DialogExample = () => <DialogStory />;

export default {
  title: 'UiKit/Dialog',
};
