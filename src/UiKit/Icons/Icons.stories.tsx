import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { CancelIcon } from './CancelIcon';
import { CloseIcon } from './CloseIcon';
import { ToggleIcon } from './ToggleIcon';

const useStyles = makeStyles<Theme>(() => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
}));

const IconsStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <CancelIcon size="sm" />
      <ToggleIcon size="sm" />
      <ToggleIcon size="md" />
      <CloseIcon size="md" />
    </div>
  );
};

export const IconsExample = () => <IconsStory />;

export default {
  title: 'UiKit/Icons',
};
