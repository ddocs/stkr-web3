import { Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React from 'react';
import { DEFAULT_FIXED } from '../../../../common/const';
import { useWalletBalanceItem } from './WalletBalanceItemStyles';

interface IWalletBalanceItemProps {
  className?: string;
  hide?: boolean;
  value?: BigNumber;
}

export const WalletBalanceItem = ({
  className,
  value,
  hide = false,
}: IWalletBalanceItemProps) => {
  const classes = useWalletBalanceItem();
  if (!value || hide) {
    return null;
  }

  return (
    <Typography
      color="textSecondary"
      className={classNames(classes.item, className)}
      title="aETHc"
    >
      {value.decimalPlaces(DEFAULT_FIXED).toFormat()}
    </Typography>
  );
};
