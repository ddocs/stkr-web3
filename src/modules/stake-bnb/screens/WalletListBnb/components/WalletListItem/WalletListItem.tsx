import * as React from 'react';
import { useWalletListItemStyles } from './WalletListItemStyles';
import { Paper, Typography } from '@material-ui/core';
import { walletConversion } from '../../../../../../common/utils/convertWallet';

interface IWalletListItemProps {
  name: string;
  address: string;
}

export const WalletListItem = ({ name, address }: IWalletListItemProps) => {
  const classes = useWalletListItemStyles();

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
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
