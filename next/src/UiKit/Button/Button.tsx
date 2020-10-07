import React from 'react';
import { Button as ButtonComponent, ButtonProps } from '@material-ui/core';

type ButtonsVariant = 'contained' | 'outlined' | 'text';

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    variant?: ButtonsVariant;
    submit?: boolean;
    style?: React.CSSProperties;
  }
>(({ variant = 'contained', submit, style, ...props }, ref) => (
  <ButtonComponent
    variant={variant}
    component="button"
    type={submit ? 'submit' : 'button'}
    ref={ref}
    style={style}
    {...props}
  />
));
