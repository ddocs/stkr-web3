import { Box, BoxProps, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React from 'react';
import { useBalanceValueStyles } from './useBalanceValueStyles';

interface IBalanceValueProps extends BoxProps {
  amount?: BigNumber;
  currencyType: string;
  isLoading?: boolean;
}

export const BalanceValue = ({
  amount,
  currencyType,
  isLoading,
  className,
  ...boxProps
}: IBalanceValueProps) => {
  const classes = useBalanceValueStyles();

  return (
    <Box {...boxProps} className={classNames(classes.root, className)}>
      <Typography variant="h2" className={classes.value}>
        {isLoading || !amount ? <Skeleton width={50} /> : amount.toFixed(2)}
      </Typography>

      <Typography variant="h6">{currencyType}</Typography>
    </Box>
  );
};
