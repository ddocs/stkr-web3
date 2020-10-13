import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useDropdownStyles } from './DropdownStyles';
import { Providers } from '../../../../common/types';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { PROVIDERS, providersKeys } from '../UnlockWallet/UnlockWalletContent';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { SubTitle } from '../../../../UiKit/Typography/Typography';
import { walletConversion } from '../../../../common/utils/convertWallet';
import { NavLink } from '../../../../UiKit/Link';
import { CopyIcon } from '../../../../UiKit/Icons/CopyIcon';
import { ViewIcon } from '../../../../UiKit/Icons/ViewIcon';

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

export const Dropdown = ({
  className,
  address,
  provider,
  visible,
}: IWalletProps) => {
  const classes = useDropdownStyles({ currentProvider: provider });

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
            {t(PROVIDERS[provider])}
          </SubTitle>
          <span className={classes.address}>{walletConversion(address)}</span>
          <Button
            className={classes.disconnect}
            onClick={handleDisconnect}
            variant="text"
            color="secondary"
          >
            {t('navigation.disconnect')}
          </Button>
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
      <ul className={classes.list}>
        {providersList.map(key => (
          <Item
            key={key}
            caption={t(PROVIDERS[key])}
            onSelect={handleSelect}
            reference={key}
            icon={key}
          />
        ))}
      </ul>
    </BackgroundColorProvider>
  );
};
