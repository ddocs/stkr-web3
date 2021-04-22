import { ButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { Button } from '../../../../UiKit/Button';
import { useBigButtonStyles } from './BigButtonStyles';

interface IBigButtonprops extends ButtonProps {
  isLoading?: boolean;
}

export const BigButton = ({
  isLoading = false,
  className,
  ...props
}: IBigButtonprops) => {
  const classes = useBigButtonStyles();

  return (
    <Button
      {...props}
      size="large"
      color="primary"
      className={classNames(classes.root, className)}
      endIcon={isLoading ? <QueryLoading size={16} /> : undefined}
    />
  );
};
