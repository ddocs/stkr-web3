import * as React from 'react';
import { useTotalStyles } from './RangeStyles';
import classNames from 'classnames';

const MAX = 100;

export interface IRangeProps {
  className?: string;
  value: number;
  width?: string | number;
}

export const Range = ({ className, value, width = '100%' }: IRangeProps) => {
  const classes = useTotalStyles({ value: value <= MAX ? value : MAX, width });

  return <span className={classNames(classes.root, className)} />;
};
