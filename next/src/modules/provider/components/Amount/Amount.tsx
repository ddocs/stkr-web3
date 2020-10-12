import React from 'react';
import { useAmountStyles } from './AmountStyles';
import classNames from 'classnames';
import { Body2, Headline2 } from '../../../../UiKit/Typography';

interface IAmountProps {
  className?: string;
  caption: string;
  value: number;
  children?: React.ReactNode;
}

export const Amount = ({
  className,
  caption,
  value,
  children,
}: IAmountProps) => {
  const classes = useAmountStyles();

  return (
    <div className={classNames(classes.component, className)}>
      <Body2 className={classes.caption} component="p">
        {caption}
      </Body2>
      <Headline2 className={classes.value} component="p">
        {value}
        <div className={classes.extension}>{children}</div>
      </Headline2>
    </div>
  );
};
