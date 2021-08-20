import classNames from 'classnames';
import * as React from 'react';
import { ReactComponent as SpinnerIcon } from './assets/spinner.svg';
import { useSpinnerStyles } from './SpinnerStyles';

interface ISpinnerProps {
  centered?: boolean;
  size?: number;
  className?: string;
}

export const Spinner = ({
  centered = false,
  size,
  className,
}: ISpinnerProps) => {
  const classes = useSpinnerStyles({ size });

  return (
    <SpinnerIcon
      className={classNames(
        classes.component,
        centered && classes.centered,
        className,
      )}
    />
  );
};
