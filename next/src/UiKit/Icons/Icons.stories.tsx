import React from 'react';
import { CancelIcon } from './CancelIcon';
import { ToggleIcon } from './ToggleIcon';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
    </div>
  );
};

export const IconsExample = () => <IconsStory />;

export default {
  title: 'UiKit/Icons',
};
