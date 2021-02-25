import classNames from 'classnames';
import React from 'react';
import { walletConversion } from '../../../../common/utils/convertWallet';
import { WalletIcon } from '../WalletIcon';
import { useAddressStyles } from './AddressStyles';

export interface IAddressProps {
  className?: string;
  address: string;
  walletIcon?: string;
}

export const Address = ({ className, address, walletIcon }: IAddressProps) => {
  const classes = useAddressStyles();

  return (
    <div className={classNames(classes.component, className)}>
      <WalletIcon icon={walletIcon} className={classes.icon} />

      {walletConversion(address)}
    </div>
  );
};
