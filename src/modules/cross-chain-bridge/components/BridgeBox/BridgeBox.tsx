import { Paper, PaperProps } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { useBridgeBoxStyles } from './BridgeBoxStyles';

interface IBridgeBoxProps extends PaperProps {}

export const BridgeBox = ({ className, ...props }: IBridgeBoxProps) => {
  const classes = useBridgeBoxStyles();

  return (
    <Paper
      {...props}
      className={classNames(classes.root, className)}
      variant="outlined"
      square={false}
    />
  );
};
