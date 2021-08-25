import { Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React from 'react';
import { DEFAULT_FIXED } from '../../../../common/const';
import { useWalletBalanceItem } from './WalletBalanceItemStyles';

interface IWalletBalanceItemProps {
  name?: string;
  hide?: boolean;
  value?: BigNumber;
}

export const WalletBalanceItem = ({
  name,
  value,
  hide = false,
}: IWalletBalanceItemProps) => {
  const classes = useWalletBalanceItem({ name });
  if (!value || hide) {
    return null;
  }

  return (
    <Typography
      color="textSecondary"
      style={{}}
      className={classes.item}
      title="aETHc"
    >
      {value.decimalPlaces(DEFAULT_FIXED).toFormat()}
    </Typography>
  );
};
