import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Menu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import { Blockchain } from '../../../../common/types';
import { WalletBalanceItem } from '../WalletBalanceItem';
import { addTokenToMetamask, tokenType } from '../../utils/token';

import { useWalletBalance } from './WalletBalanceStyles';

interface IWalletBalanceProps {
  className?: string;
  blockchainType?: Blockchain;
  ethereum?: BigNumber;
  ankr?: BigNumber;
  bnb?: BigNumber;
  aeth?: BigNumber;
  avax?: BigNumber;
  showInARow?: boolean;
}

export const WalletBalance = ({
  ethereum,
  ankr,
  bnb,
  aeth,
  avax,
  className,
  blockchainType,
  showInARow,
}: IWalletBalanceProps) => {
  const classes = useWalletBalance();
  const [visibleTokens, setVisibleTokens] = useState<tokenType[]>([]);
  const showMainBalances =
    blockchainType &&
    [Blockchain.ethereum, Blockchain.binance].includes(blockchainType);

  useEffect(() => {
    const newVisibleTokens = [] as tokenType[];
    if (showMainBalances && aeth?.isGreaterThan(0)) {
      newVisibleTokens.push('aETH');
    }
    if (showMainBalances && ethereum?.isGreaterThan(0)) {
      newVisibleTokens.push('ETH');
    }
    if (bnb?.isGreaterThan(0)) {
      newVisibleTokens.push('BNB');
    }
    if (ankr?.isGreaterThan(0)) {
      newVisibleTokens.push('ANKR');
    }
    if (avax?.isGreaterThan(0)) {
      newVisibleTokens.push('AVAX');
    }
    setVisibleTokens(newVisibleTokens);
  }, [aeth, ankr, avax, bnb, ethereum, showMainBalances]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTokenClick = async (event: React.MouseEvent<HTMLLIElement>) => {
    const tokenName = event.currentTarget.getAttribute('value') as tokenType;
    await addTokenToMetamask(tokenName);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getBalanceItem = (token: tokenType) => {
    switch (token) {
      case 'aETH':
        return <WalletBalanceItem value={aeth} className={classes.aeth} />;
      case 'ETH':
        return (
          <WalletBalanceItem value={ethereum} className={classes.ethereum} />
        );
      case 'BNB':
        return <WalletBalanceItem value={bnb} className={classes.bnb} />;
      case 'ANKR':
        return <WalletBalanceItem value={ankr} className={classes.ankr} />;
      case 'AVAX':
        return <WalletBalanceItem value={avax} className={classes.avax} />;
    }
  };

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.grid}>
        {showInARow ? (
          visibleTokens.map(token => getBalanceItem(token))
        ) : (
          <>
            <div
              onClick={handleClick}
              aria-controls="menu"
              aria-haspopup="true"
            >
              {getBalanceItem('ETH')}
            </div>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              {visibleTokens.map(token => (
                <MenuItem key={token} value={token} onClick={handleTokenClick}>
                  {getBalanceItem(token)}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};
