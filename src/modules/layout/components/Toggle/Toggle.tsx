import React from 'react';
import classNames from 'classnames';
import { useToggleStyles } from './ToggleStyles';
import { Button } from '../../../../UiKit/Button';
import { ButtonProps } from '@material-ui/core';

interface IToggleProps {
  className?: string;
  onClick?(): void;
}

export const Toggle = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { opened?: boolean; className?: string }
>(({ className, opened, ...props }, ref) => {
  const classes = useToggleStyles();
  return (
    <Button
      className={classNames(
        classes.component,
        opened && classes.componentOpened,
        className,
      )}
      ref={ref}
      variant="text"
      aria-label="open/close"
      {...props}
    />
  );
});
