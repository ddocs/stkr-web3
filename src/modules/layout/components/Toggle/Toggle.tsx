import React, { SVGAttributes } from 'react';
import classNames from 'classnames';
import { useToggleStyles } from './ToggleStyles';
import { Button } from '../../../../UiKit/Button';
import { ButtonProps } from '@material-ui/core';

const Line = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg viewBox="0 0 32 2" fill="none" {...props}>
      <path fill="currentColor" d="M0 0h32v2H0z" />
    </svg>
  );
};

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
    >
      <Line className={classNames(classes.line, classes.top)} />
      <Line className={classNames(classes.line, classes.bottom)} />
    </Button>
  );
});
