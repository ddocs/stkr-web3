import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Picker } from './Picker';
import { DefaultLayoutComponent } from '../layout/components/DefautLayout/DefautLayout';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const PickerStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <DefaultLayoutComponent isAuth={true}>
        <Picker />
      </DefaultLayoutComponent>
    </div>
  );
};

export const PickerExample = () => <PickerStory />;

export default {
  title: 'modules/Picker',
};
