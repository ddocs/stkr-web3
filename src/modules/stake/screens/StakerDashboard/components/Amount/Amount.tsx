import * as React from 'react';
import { ReactNode } from 'react';
import { useAmountStyles } from './AmountStyles';
import { Typography } from '@material-ui/core';

export interface ITotalProps {
  value: string;
  unit: ReactNode;
}

export const Amount = ({ value, unit }: ITotalProps) => {
  const classes = useAmountStyles();

  return (
    <Typography color="primary" component="div" className={classes.component}>
      <div className={classes.unit}>{unit}</div>
      {value}
    </Typography>
  );
};
