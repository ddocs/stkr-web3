import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { Button } from '../../../../../UiKit/Button';
import { walletConversion } from '../../../../../common/utils/convertWallet';

import { useWalletSwitcherStyles } from './WalletSwitcherStyles';
import cn from 'classnames';

interface WalletSwitcherProps {
  wallets: string[];
  currentWallet: string;
  onConnect: (account: string) => () => void;
}
export const WalletSwitcher = ({
  wallets,
  currentWallet,
  onConnect,
}: WalletSwitcherProps) => {
  const classes = useWalletSwitcherStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpened = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (wallet: string) => () => {
    if (currentWallet !== wallet) {
      onConnect(wallet)();
      handleClose();
    }
  };

  if (!wallets) {
    return null;
  }

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.button}
        onClick={handleClick}
        endIcon={isOpened ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        {walletConversion(currentWallet)}
      </Button>
      <Menu
        classes={{ paper: classes.menu, list: classes.menuList }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isOpened}
        onClose={handleClose}
      >
        {wallets.map(wallet => (
          <MenuItem
            onClick={handleMenuItemClick(wallet)}
            key={wallet}
            className={cn({
              [classes.walletSelected]: wallet === currentWallet,
            })}
          >
            {walletConversion(wallet)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
