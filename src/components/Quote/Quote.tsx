import * as React from 'react';
import { ReactNode } from 'react';
import { useQuoteStyles } from './QuoteStyles';

export interface IQuoteProps {
  children?: ReactNode;
}

export const Quote = ({ children }: IQuoteProps) => {
  const classes = useQuoteStyles();

  return <div className={classes.root}>{children}</div>;
};
