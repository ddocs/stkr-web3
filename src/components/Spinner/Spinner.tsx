import * as React from 'react';
import { useSpinnerStyles } from './SpinnerStyles';
import { ReactComponent as SpinnerIcon } from './assets/spinner.svg';
import classNames from 'classnames';

interface ISpinnerProps {
  centered?: boolean;
}

export const Spinner = ({ centered = false }: ISpinnerProps) => {
  const classes = useSpinnerStyles();

  return (
    <SpinnerIcon
      className={classNames(classes.component, centered && classes.centered)}
    />
  );
};
