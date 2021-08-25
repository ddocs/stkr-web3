import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Menu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import { Blockchain } from '../../../../common/types';
import { WalletBalanceItem } from '../WalletBalanceItem';
import {
  addTokenToWallet,
  getVisibleTokens,
  tokenType,
} from '../../utils/token';

import { useWalletBalance } from './WalletBalanceStyles';

interface IWalletBalanceProps {
  className?: string;
  blockchainType?: Blockchain;
  eth?: BigNumber;
  ankr?: BigNumber;
  bnb?: BigNumber;
  aeth?: BigNumber;
  avax?: BigNumber;
  showInARow?: boolean;
}

export const WalletBalance = ({
  eth,
  ankr,
  bnb,
  aeth,
  avax,
  className,
  blockchainType,
  showInARow,
}: IWalletBalanceProps) => {
  const classes = useWalletBalance();

  const visibleTokens = useMemo(
    () =>
      getVisibleTokens(
        [
          { name: 'aETH', balance: aeth },
          { name: 'ETH', balance: eth },
          { name: 'BNB', balance: bnb },
          { name: 'ANKR', balance: ankr },
          { name: 'AVAX', balance: avax },
        ],
        blockchainType,
      ),
    [aeth, ankr, avax, bnb, eth, blockchainType],
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTokenClick = async (event: React.MouseEvent<HTMLLIElement>) => {
    const tokenName = event.currentTarget.getAttribute('value') as tokenType;
    const token = visibleTokens.find(t => t.name === tokenName);
    if (token) {
      await addTokenToWallet(token);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.grid}>
        {showInARow ? (
          visibleTokens.map(token => (
            <WalletBalanceItem
              value={token.balance}
              name={token.name.toLowerCase()}
            />
          ))
        ) : (
          <>
            <div
              onClick={handleClick}
              aria-controls="menu"
              aria-haspopup="true"
            >
              <WalletBalanceItem
                value={visibleTokens[0].balance}
                name={visibleTokens[0].name.toLowerCase()}
              />
            </div>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              getContentAnchorEl={null}
              classes={{ list: classes.listMenu, paper: classes.paperMenu }}
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
                <MenuItem
                  key={token.name}
                  value={token.name}
                  onClick={handleTokenClick}
                >
                  <WalletBalanceItem
                    value={token.balance}
                    name={token.name.toLowerCase()}
                  />
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};
