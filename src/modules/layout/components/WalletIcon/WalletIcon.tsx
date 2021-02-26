import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { ReactComponent as WalletThumbIcon } from './assets/wallet-thumb.svg';
import { useWalletIconStyles } from './WalletIconStyles';

interface IWalletIconProps {
  icon?: string;
  className?: string;
}

export const WalletIcon = ({ icon, className }: IWalletIconProps) => {
  const [imgError, setImgError] = useState(false);
  const onError = useCallback(() => setImgError(true), []);
  const classes = useWalletIconStyles();
  const commonClassName = classNames(classes.icon, className);

  return icon && !imgError ? (
    <img className={commonClassName} src={icon} alt="" onError={onError} />
  ) : (
    <i className={commonClassName}>
      <WalletThumbIcon />
    </i>
  );
};
