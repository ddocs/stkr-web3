import classNames from 'classnames';
import React from 'react';
import { walletConversion } from '../../../../common/utils/convertWallet';
import { WalletIcon } from '../WalletIcon';
import { useAddressStyles } from './AddressStyles';

export interface IAddressProps {
  className?: string;
  address: string;
  walletIcon?: string;
  onClick?: () => void;
}

export const Address = ({
  className,
  address,
  walletIcon,
  onClick,
}: IAddressProps) => {
  const classes = useAddressStyles();

  return (
    <div className={classNames(classes.component, className)} onClick={onClick}>
      <WalletIcon icon={walletIcon} className={classes.icon} />

      {walletConversion(address)}
    </div>
  );
};
