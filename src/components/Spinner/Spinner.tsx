import * as React from 'react';
import { useSpinnerStyles } from './SpinnerStyles';
import { ReactComponent as SpinnerIcon } from './assets/spinner.svg';

export const Spinner = () => {
  const classes = useSpinnerStyles();

  return <SpinnerIcon className={classes.component} />;
};
