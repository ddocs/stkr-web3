import classNames from 'classnames';
import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { FocusOn } from 'react-focus-on';
import { Address } from '../Address';
import { useWalletStyles } from './WalletStyles';

interface IWalletProps {
  className?: string;
  address: string | undefined;
  icon: string | undefined;
  balance: ReactNode;
  children: ReactNode;
}

export const Wallet = ({
  className,
  address,
  icon,
  children,
  balance,
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
      <button className={classes.toggle} ref={controlRef}>
        {balance}

        {address && (
          <Address onClick={handleOpen} address={address} walletIcon={icon} />
        )}
      </button>

      <FocusOn
        enabled={isOpen}
        onEscapeKey={handleClose}
        onClickOutside={handleClose}
        focusLock={true}
        scrollLock={false}
        shards={[controlRef]}
      >
        <div
          className={classNames(
            classes.dropdown,
            isOpen && classes.dropdownActive,
          )}
        >
          {children}
        </div>
      </FocusOn>
    </div>
  );
};
