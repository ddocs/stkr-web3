import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cn from 'classnames';
import React, { useState } from 'react';
import { walletConversion } from '../../../../common/utils/convertWallet';
import { Button } from '../../../../UiKit/Button';
import { usePolkadotAccountSwitcherStyles } from './PolkadotAccountSwitcherStyles';

interface PolkadotAccountSwitcherProps {
  wallets: string[];
  currentWallet: string;
  onChange: (account: string) => void;
}
export const PolkadotAccountSwitcherComponent = ({
  wallets,
  currentWallet,
  onChange,
}: PolkadotAccountSwitcherProps) => {
  const classes = usePolkadotAccountSwitcherStyles();

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
      onChange(wallet);
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
