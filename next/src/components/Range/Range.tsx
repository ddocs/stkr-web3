import * as React from 'react';
import { useTotalStyles } from './RangeStyles';

const MAX = 100;

export interface IRangeProps {
  value: number;
  width?: string | number;
}

export const Range = ({ value, width = '100%' }: IRangeProps) => {
  const classes = useTotalStyles({ value: value <= MAX ? value : MAX, width });

  return <span className={classes.root} />;
};
