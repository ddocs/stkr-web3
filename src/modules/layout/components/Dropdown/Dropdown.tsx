import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDropdownStyles } from './DropdownStyles';
import { Providers } from '../../../../common/types';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { SubTitle } from '../../../../UiKit/Typography/Typography';
import { walletConversion } from '../../../../common/utils/convertWallet';
import { NavLink } from '../../../../UiKit/NavLink';
import { CopyIcon } from '../../../../UiKit/Icons/CopyIcon';
import { ViewIcon } from '../../../../UiKit/Icons/ViewIcon';
import { PROVIDERS } from '../const';
import { useAction } from '../../../../store/redux';
import { UserActions } from '../../../../store/actions/UserActions';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Typography } from '@material-ui/core';
import { getWalletLink } from '../../../../common/utils/getWalletLink';

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
}: IWalletProps & { providers: Record<string, any> }) => {
  const classes = useDropdownStyles({ currentProvider: provider });
  const dispatchDisconnect = useAction(UserActions.disconnect);

  const providersKeys = Object.keys(providers);

  const providersList = providersKeys.filter(
    key => key !== provider && providers[key].available,
  );

  const handleSelect = useCallback((selectedItem: string) => {
    alert(`selected ${selectedItem}`);
  }, []);

  const [isCopy, setCopy] = useState<boolean>(false);

  useEffect(() => {
    if (isCopy) {
      setTimeout(() => setCopy(false), 1000);
    }
  }, [isCopy]);

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
        <>
          <div className={classes.info}>
            <SubTitle className={classes.title}>
              {t(providers[provider].caption)}
            </SubTitle>
            <span className={classes.address}>{walletConversion(address)}</span>
            <Button
              className={classes.disconnect}
              onClick={dispatchDisconnect}
              variant="text"
              color="secondary"
            >
              {t('navigation.disconnect')}
            </Button>
          </div>
          <div className={classes.navigation}>
            <div className={classes.copy}>
              <CopyToClipboard text={address} onCopy={() => setCopy(true)}>
                <Button
                  className={classes.copyAction}
                  variant="text"
                  color="secondary"
                  size="small"
                >
                  <CopyIcon className={classes.icon} />
                  {t('navigation.copy-address')}
                </Button>
              </CopyToClipboard>
              {isCopy && (
                <Typography
                  className={classes.copyMessage}
                  component="span"
                  color="secondary"
                >
                  {t('navigation.copied')}
                </Typography>
              )}
            </div>
            <NavLink
              className={classes.view}
              color="secondary"
              href={getWalletLink(address)}
              size="small"
            >
              <ViewIcon className={classes.icon} />
              {t('navigation.view-on-etherscan')}
            </NavLink>
          </div>
        </>
      )}
      {providersList.length !== 0 && (
        <ul className={classes.list}>
          {providersList.map(key => {
            const item = providers[key];
            return (
              <Item
                key={key}
                caption={t(item.caption)}
                onSelect={handleSelect}
                reference={key}
                icon={key}
              />
            );
          })}
        </ul>
      )}
    </BackgroundColorProvider>
  );
};

export const Dropdown = (props: IWalletProps) => (
  <DropdownComponent providers={PROVIDERS} {...props} />
);
