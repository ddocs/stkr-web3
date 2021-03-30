import { ButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { Button } from '../../../../UiKit/Button';
import { useBigButtonStyles } from './BigButtonStyles';

export const BigButton = ({ className, ...props }: ButtonProps) => {
  const classes = useBigButtonStyles();

  return (
    <Button
      {...props}
      size="large"
      color="primary"
      className={classNames(classes.root, className)}
    />
  );
};
