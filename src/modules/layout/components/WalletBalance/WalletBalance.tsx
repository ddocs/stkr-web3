import { Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React from 'react';
import { DEFAULT_FIXED } from '../../../../common/const';
import { useWalletBalance } from './WalletBalanceStyles';

interface IWalletBalanceProps {
  className?: string;
  ethereum?: BigNumber;
  ankr?: BigNumber;
  aeth?: BigNumber;
}

export const WalletBalance = ({
  ethereum,
  ankr,
  aeth,
  className,
}: IWalletBalanceProps) => {
  const classes = useWalletBalance();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.grid}>
        <Typography
          color="textSecondary"
          className={classNames(classes.item, classes.aeth)}
          title="aETH"
        >
          {aeth ? aeth.decimalPlaces(DEFAULT_FIXED).toFormat() : 0}
        </Typography>

        <Typography
          color="textSecondary"
          className={classNames(classes.item, classes.ethereum)}
          title="Ethereum"
        >
          {ethereum ? ethereum.decimalPlaces(DEFAULT_FIXED).toFormat() : 0}
        </Typography>

        <Typography
          color="textSecondary"
          className={classNames(classes.item, classes.ankr)}
          title="Ankr"
        >
          {ankr ? ankr.decimalPlaces(DEFAULT_FIXED).toFormat() : 0}
        </Typography>
      </div>
    </div>
  );
};
