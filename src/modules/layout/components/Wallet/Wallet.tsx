import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { useWalletStyles } from './WalletStyles';
import { Address } from '../Address';
import { FocusOn } from 'react-focus-on';
import { Providers } from '../../../../common/types';
import { Dropdown } from '../Dropdown';
import BigNumber from 'bignumber.js';
import { DEFAULT_FIXED } from '../../../../common/const';

interface IWalletProps {
  className?: string;
  ethereumBalance?: BigNumber;
  ankrBalance?: BigNumber;
  address: string | undefined;
  provider: Providers | undefined;
}

export const Wallet = ({
  className,
  ethereumBalance,
  ankrBalance,
  address,
  provider,
}: IWalletProps) => {
  const classes = useWalletStyles();

  const [isOpen, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    if (isOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const controlRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={classNames(classes.component, className)}>
      <button className={classes.toggle} onClick={handleOpen} ref={controlRef}>
        <span className={classes.ethereum}>
          {ethereumBalance ? ethereumBalance.toFormat(DEFAULT_FIXED) : 0}
        </span>
        <span className={classes.ankr}>
          {ankrBalance ? ankrBalance.toFormat(DEFAULT_FIXED) : 0}
        </span>
        {address && provider && (
          <Address
            className={classes.address}
            address={address}
            provider={provider}
          />
        )}
      </button>
      <div className={classes.wrapper}>
        <FocusOn
          enabled={isOpen}
          onEscapeKey={handleClose}
          onClickOutside={handleClose}
          focusLock={true}
          scrollLock={false}
          shards={[controlRef]}
        >
          <Dropdown
            className={classes.dropdown}
            visible={isOpen}
            address={address}
            provider={provider}
          />
        </FocusOn>
      </div>
    </div>
  );
};
