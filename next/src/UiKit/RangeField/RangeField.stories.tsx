import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { RangeField } from './RangeField';
import { Field, Form, FormRenderProps } from 'react-final-form';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const RangeFieldStory = () => {
  const classes = useStyles();

  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit}>
        <Field
          className={classes.input}
          component={RangeField}
          name="email"
          label="Your email address"
        />
      </form>
    );
  };

  return (
    <div className={classes.block}>
      <Form onSubmit={() => alert('Submit')} render={renderForm} />
    </div>
  );
};

export const RangeFieldExample = () => <RangeFieldStory />;

export default {
  title: 'UiKit/RangeField',
};
