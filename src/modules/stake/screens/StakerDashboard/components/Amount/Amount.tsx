import * as React from 'react';
import { useAmountStyles } from './AmountStyles';
import { Headline1 } from '../../../../../../UiKit/Typography';
import { SubTitle } from '../../../../../../UiKit/Typography/Typography';

export interface ITotalProps {
  value: string;
  unit: string;
}

export const Amount = ({ value, unit }: ITotalProps) => {
  const classes = useAmountStyles();

  return (
    <Headline1 color="primary" className={classes.component}>
      {value}
      <SubTitle color="primary" className={classes.unit}>
        {unit}
      </SubTitle>
    </Headline1>
  );
};
