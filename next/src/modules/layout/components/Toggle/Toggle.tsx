import React from 'react';
import classNames from 'classnames';
import { useToggleStyles } from './ToggleStyles';
import { ToggleIcon } from '../../../../UiKit/Icons/ToggleIcon';
import { Button } from '../../../../UiKit/Button';

interface IToggleProps {
  className?: string;
}

export const Toggle = ({ className }: IToggleProps) => {
  const classes = useToggleStyles();

  return (
    <Button className={classNames(classes.component, className)} variant="text">
      <ToggleIcon />
    </Button>
  );
};
