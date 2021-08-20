import { Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React from 'react';
import { DEFAULT_FIXED } from '../../../../common/const';
import { useWalletBalance } from './WalletBalanceStyles';
import { Blockchain } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';

interface IWalletBalanceProps {
  className?: string;
  blockchainType?: Blockchain;
  ethereum?: BigNumber;
  ankr?: BigNumber;
  bnbBalance?: BigNumber;
  aeth?: BigNumber;
  avax?: BigNumber;
}

export const WalletBalance = ({
  ethereum,
  ankr,
  bnbBalance,
  aeth,
  avax,
  className,
  blockchainType,
}: IWalletBalanceProps) => {
  const classes = useWalletBalance();
  const showMainBalances =
    blockchainType &&
    [Blockchain.ethereum, Blockchain.binance].includes(blockchainType);

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.grid}>
        {showMainBalances && (
          <>
            <Typography
              color="textSecondary"
              className={classNames(classes.item, classes.aeth)}
              title="aETHc"
            >
              {aeth?.decimalPlaces(DEFAULT_FIXED).toFormat() ?? 0}
            </Typography>

            <Typography
              color="textSecondary"
              className={classNames(classes.item, classes.ethereum)}
              title="Ethereum"
            >
              {ethereum?.decimalPlaces(DEFAULT_FIXED).toFormat() ?? 0}
            </Typography>
          </>
        )}

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

        {avax && (
          <Typography
            color="textSecondary"
            className={classNames(classes.item, classes.avax)}
            title={t('stake-avax.avax')}
          >
            {avax.decimalPlaces(DEFAULT_FIXED).toFormat()}
          </Typography>
        )}
      </div>
    </div>
  );
};
