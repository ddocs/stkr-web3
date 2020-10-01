import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Button } from './Button';

const useStyles = makeStyles<Theme>(() => ({
  block: {
    padding: 16,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    margin: 8,
  },

  button: {
    marginRight: 16,
  },
}));

const ButtonStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      Size
      <div className={classes.content}>
        <Button className={classes.button}>Default</Button>
        <Button className={classes.button} size="small">
          Small
        </Button>
      </div>
      Type
      <div className={classes.content}>
        <Button className={classes.button}>Default</Button>
        <Button className={classes.button} variant="outlined">
          Outlined
        </Button>
        <Button className={classes.button} variant="text">
          Text
        </Button>
      </div>
    </div>
  );
};

export const ButtonExample = () => <ButtonStory />;

export default {
  title: 'UiKit/Button',
};
