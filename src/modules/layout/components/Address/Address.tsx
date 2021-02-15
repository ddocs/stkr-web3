import React from 'react';
import classNames from 'classnames';
import { useAddressStyles } from './AddressStyles';
import { walletConversion } from '../../../../common/utils/convertWallet';
import { Provider } from '../../../../common/types';

export interface IAddressProps {
  className?: string;
  address: string;
  provider: Provider;
}

export const Address = ({ className, address, provider }: IAddressProps) => {
  const classes = useAddressStyles({ type: provider });

  return (
    <div className={classNames(classes.component, className)}>
      {walletConversion(address)}
    </div>
  );
};
