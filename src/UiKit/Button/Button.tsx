import { Button as ButtonComponent, ButtonProps } from '@material-ui/core';
import React from 'react';
import { QueryLoading } from '../../components/QueryLoading/QueryLoading';

type ButtonsVariant = 'contained' | 'outlined' | 'text';

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    variant?: ButtonsVariant;
    submit?: boolean;
    style?: React.CSSProperties;
    isLoading?: boolean;
  }
>(({ variant = 'contained', submit, style, isLoading, ...props }, ref) => (
  <ButtonComponent
    variant={variant}
    component="button"
    type={submit ? 'submit' : 'button'}
    ref={ref}
    style={style}
    endIcon={isLoading ? <QueryLoading size={16} /> : undefined}
    {...props}
  />
));
