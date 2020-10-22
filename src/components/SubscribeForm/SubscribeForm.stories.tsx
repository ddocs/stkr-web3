import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { SubscribeForm } from './SubscribeForm';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},

  form: {
    marginBottom: 16,
  },
}));

const SubscribeFormStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <SubscribeForm
        className={classes.form}
        onSubmit={() => alert('Send')}
        buttonCaption="Next"
      />
      <SubscribeForm
        className={classes.form}
        onSubmit={() => alert('Send')}
        color="secondary"
        buttonCaption="Submit"
      />
    </div>
  );
};

export const SubscribeFormExample = () => <SubscribeFormStory />;

export default {
  title: 'components/SubscribeForm',
};
