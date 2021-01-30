import React from 'react';
import { StepIconProps } from '@material-ui/core';
import { useStepIconStyles } from './StepIconStyles';
import classNames from 'classnames';

export function StepIcon({ active, icon }: StepIconProps) {
  const classes = useStepIconStyles();

  return (
    <div className={classNames(classes.root, active && classes.active)}>
      {icon}
    </div>
  );
}
