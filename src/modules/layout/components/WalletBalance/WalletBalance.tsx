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
  bnbBalance?: BigNumber;
  aeth?: BigNumber;
}

export const WalletBalance = ({
  ethereum,
  ankr,
  bnbBalance,
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

        {bnbBalance && (
          <Typography
            color="textSecondary"
            className={classNames(classes.item, classes.binance)}
            title="BNB"
          >
            {bnbBalance.decimalPlaces(DEFAULT_FIXED).toFormat()}
          </Typography>
        )}

        {ankr && (
          <Typography
            color="textSecondary"
            className={classNames(classes.item, classes.ankr)}
            title="Ankr"
          >
            {ankr.decimalPlaces(DEFAULT_FIXED).toFormat()}
          </Typography>
        )}
      </div>
    </div>
  );
};
