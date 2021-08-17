import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React from 'react';

import { Blockchain } from '../../../../common/types';
import { WalletBalanceItem } from '../WalletBalanceItem';

import { useWalletBalance } from './WalletBalanceStyles';

interface IWalletBalanceProps {
  className?: string;
  blockchainType?: Blockchain;
  ethereum?: BigNumber;
  ankr?: BigNumber;
  bnb?: BigNumber;
  aeth?: BigNumber;
  avax?: BigNumber;
}

export const WalletBalance = ({
  ethereum,
  ankr,
  bnb,
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
            <WalletBalanceItem value={aeth} className={classes.aeth} />
            <WalletBalanceItem value={ethereum} className={classes.ethereum} />
          </>
        )}

        <WalletBalanceItem value={bnb} className={classes.bnb} />
        <WalletBalanceItem value={ankr} className={classes.ankr} />
        <WalletBalanceItem value={avax} className={classes.avax} />
      </div>
    </div>
  );
};
