import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Button } from './Button';

const useStyles = makeStyles<Theme>(theme => ({
  block: {
    '& hr': {
      display: 'block',
      margin: '16px 0',
      borderColor: theme.palette.text.secondary,
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 16,
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
        <Button className={classes.button} size="large">
          Large
        </Button>
      </div>
      <hr />
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
      <hr />
      Color
      <div>
        Contained
        <div className={classes.content}>
          <Button className={classes.button}>Default</Button>
          <Button className={classes.button} color="primary">
            Primary{' '}
          </Button>
          <Button className={classes.button} color="secondary">
            Secondary
          </Button>
        </div>
        <hr />
        Outlined
        <div className={classes.content}>
          <Button className={classes.button} variant="outlined">
            Default
          </Button>
          <Button className={classes.button} color="primary" variant="outlined">
            Primary{' '}
          </Button>
          <Button
            className={classes.button}
            color="secondary"
            variant="outlined"
          >
            Secondary
          </Button>
        </div>
        <hr />
        Text
        <div className={classes.content}>
          <Button className={classes.button} variant="text">
            Default
          </Button>
          <Button className={classes.button} color="primary" variant="text">
            Primary{' '}
          </Button>
          <Button className={classes.button} color="secondary" variant="text">
            Secondary
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ButtonExample = () => <ButtonStory />;

export default {
  title: 'UiKit/Button',
};
