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

interface IItemProps {
  caption: string;
  reference: string;

  onSelect(e: string): void;
}

const Item = ({ caption, reference, onSelect }: IItemProps) => {
  const handleSelect = useCallback(() => onSelect(reference), [
    onSelect,
    reference,
  ]);

  return (
    <li>
      <SubTitle component="span">{caption}</SubTitle>
      <Button
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
  const classes = useDropdownStyles();

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
        <div>
          <SubTitle>{t(PROVIDERS[provider])}</SubTitle>
          <span>{walletConversion(address)}</span>
          <Button onClick={handleDisconnect} variant="text" color="secondary">
            {t('navigation.disconnect')}
          </Button>
          <Button variant="text" color="secondary">
            {t('navigation.copy-address')}
          </Button>
          <NavLink href="#">{t('navigation.view-on-etherscan')}</NavLink>
        </div>
      )}
      <ul>
        {providersList.map(key => (
          <Item
            key={key}
            caption={t(PROVIDERS[key])}
            onSelect={handleSelect}
            reference={key}
          />
        ))}
      </ul>
    </BackgroundColorProvider>
  );
};
