import React from 'react';
import classNames from 'classnames';

import { useStyles } from './LabelStyles';

export interface ILabelProps {
  className?: string;
  title: string;
}

export const Label = ({ className, title }: ILabelProps) => {
  const classes = useStyles();

  return <div className={classNames(classes.root, className)}>{title}</div>;
};
