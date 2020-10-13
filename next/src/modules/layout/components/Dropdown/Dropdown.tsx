import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useDropdownStyles } from './DropdownStyles';
import { Providers } from '../../../../common/types';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { PROVIDERS } from '../UnlockWallet/UnlockWalletContent';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { SubTitle } from '../../../../UiKit/Typography/Typography';
import { walletConversion } from '../../../../common/utils/convertWallet';
import { NavLink } from '../../../../UiKit/Link';
import { CopyIcon } from '../../../../UiKit/Icons/CopyIcon';
import { ViewIcon } from '../../../../UiKit/Icons/ViewIcon';

const ENABLE_DISCONNECT = false;

interface IItemProps {
  caption: string;
  reference: string;
  icon: string;

  onSelect(e: string): void;
}

const Item = ({ caption, reference, icon, onSelect }: IItemProps) => {
  const classes = useDropdownStyles({ provider: icon });

  const handleSelect = useCallback(() => onSelect(reference), [
    onSelect,
    reference,
  ]);

  return (
    <li className={classes.item}>
      <SubTitle className={classes.caption} component="span">
        {caption}
      </SubTitle>
      <Button
        className={classes.select}
        variant="outlined"
        size="small"
        color="secondary"
        onClick={handleSelect}
      >
        {t('navigation.select')}
      </Button>
    </li>
  );
};

interface IWalletProps {
  className?: string;
  visible: boolean;
  address: string | undefined;
  provider: Providers | undefined;
}

export const DropdownComponent = ({
  className,
  address,
  provider,
  visible,
  providers,
}: IWalletProps & { providers: Record<string, string> }) => {
  const classes = useDropdownStyles({ currentProvider: provider });

  const providersKeys = Object.keys(providers);

  const providersList = providersKeys.filter(key => key !== provider);

  const handleSelect = useCallback((selectedItem: string) => {
    alert(`selected ${selectedItem}`);
  }, []);

  const handleDisconnect = useCallback(() => {
    alert('Disconnect');
  }, []);

  return (
    <BackgroundColorProvider
      className={classNames(
        classes.component,
        visible && classes.visible,
        className,
      )}
      component="div"
    >
      {address && provider && (
        <div className={classes.info}>
          <SubTitle className={classes.title}>
            {t(providers[provider])}
          </SubTitle>
          <span className={classes.address}>{walletConversion(address)}</span>
          {ENABLE_DISCONNECT && (
            <Button
              className={classes.disconnect}
              onClick={handleDisconnect}
              variant="text"
              color="secondary"
            >
              {t('navigation.disconnect')}
            </Button>
          )}
          <div className={classes.navigation}>
            <Button
              className={classes.copy}
              variant="text"
              color="secondary"
              size="small"
            >
              <CopyIcon className={classes.icon} />
              {t('navigation.copy-address')}
            </Button>
            <NavLink
              className={classes.view}
              color="secondary"
              href="#"
              size="small"
            >
              <ViewIcon className={classes.icon} />
              {t('navigation.view-on-etherscan')}
            </NavLink>
          </div>
        </div>
      )}
      {providersList.length !== 0 && (
        <ul className={classes.list}>
          {providersList.map(key => (
            <Item
              key={key}
              caption={t(providers[key])}
              onSelect={handleSelect}
              reference={key}
              icon={key}
            />
          ))}
        </ul>
      )}
    </BackgroundColorProvider>
  );
};

export const Dropdown = (props: IWalletProps) => (
  <DropdownComponent providers={PROVIDERS} {...props} />
);