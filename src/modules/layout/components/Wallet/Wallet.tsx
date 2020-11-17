import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { useWalletStyles } from './WalletStyles';
import { Address } from '../Address';
import { FocusOn } from 'react-focus-on';
import { Providers } from '../../../../common/types';
import { Dropdown } from '../Dropdown';
import { fixedNumber } from '../../../../common/utils/fixedNumber';
import BigNumber from 'bignumber.js';

const FIXED = 4;

interface IWalletProps {
  className?: string;
  ethereumBalance: number;
  ankrBalance: number;
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
          {new BigNumber(fixedNumber(ethereumBalance, FIXED)).toFormat()}
        </span>
        <span className={classes.ankr}>
          {new BigNumber(fixedNumber(ankrBalance, FIXED)).toFormat()}
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
