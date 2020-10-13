import React from 'react';
import classNames from 'classnames';
import { useAddressStyles } from './AddressStyles';
import { walletConversion } from '../../../../common/utils/convertWallet';
import { Providers } from '../../../../common/types';

export interface IAddressProps {
  className?: string;
  address: string;
  type: Providers;
}

export const Address = ({ className, address, type }: IAddressProps) => {
  const classes = useAddressStyles({ type: type });

  return (
    <div className={classNames(classes.component, className)}>
      {walletConversion(address)}
    </div>
  );
};
