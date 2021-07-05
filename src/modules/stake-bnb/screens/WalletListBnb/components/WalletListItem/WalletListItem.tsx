import * as React from 'react';
import { useWalletListItemStyles } from './WalletListItemStyles';
import { Paper, Typography } from '@material-ui/core';
import { walletConversion } from '../../../../../../common/utils/convertWallet';
import { useCallback } from 'react';

interface IWalletListItemProps {
  name: string;
  address: string;
  onClick: (address: string) => void;
}

export const WalletListItem = ({
  name,
  address,
  onClick,
}: IWalletListItemProps) => {
  const classes = useWalletListItemStyles();

  const handleClick = useCallback(() => {
    onClick(address);
  }, [address, onClick]);

  return (
    <Paper
      variant="outlined"
      square={false}
      className={classes.root}
      onClick={handleClick}
    >
      <Typography variant="subtitle1" className={classes.name}>
        {name}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        className={classes.address}
      >
        {walletConversion(address)}
      </Typography>
    </Paper>
  );
};
