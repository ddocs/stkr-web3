import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { CustomDialog } from './CustomDialog';

const useStyles = makeStyles<Theme>(theme => ({
  block: {
    margin: 16,
  },
}));

const CustomDialogStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <CustomDialog open={true} onClose={() => alert('Close')}>
        <div style={{ width: 300, height: 200 }} />
      </CustomDialog>
    </div>
  );
};

export const CustomDialogExample = () => <CustomDialogStory />;

export default {
  title: 'Components/CustomDialog',
};
