import * as React from 'react';
import { useSpinnerStyles } from './SpinnerStyles';
import { ReactComponent as SpinnerIcon } from './assets/spinner.svg';
import classNames from 'classnames';

interface ISpinnerProps {
  centered?: boolean;
  size?: number;
}

export const Spinner = ({ centered = false, size }: ISpinnerProps) => {
  const classes = useSpinnerStyles({ size });

  return (
    <SpinnerIcon
      className={classNames(classes.component, centered && classes.centered)}
    />
  );
};
