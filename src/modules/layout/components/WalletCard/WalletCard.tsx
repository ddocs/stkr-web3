import classNames from 'classnames';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Providers } from '../../../../common/types';
import { walletConversion } from '../../../../common/utils/convertWallet';
import { getWalletLink } from '../../../../common/utils/getWalletLink';
import { t } from '../../../../common/utils/intl';
import { UserActions } from '../../../../store/actions/UserActions';
import { useAction } from '../../../../store/redux';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Button } from '../../../../UiKit/Button';
import { CopiedIcon } from '../../../../UiKit/Icons/CopiedIcon';
import { CopyIcon } from '../../../../UiKit/Icons/CopyIcon';
import { ViewIcon } from '../../../../UiKit/Icons/ViewIcon';
import { NavLink } from '../../../../UiKit/NavLink';
import { SubTitle } from '../../../../UiKit/Typography/Typography';
import { PROVIDERS } from '../const';
import { useWalletCardStyles } from './WalletCardStyles';

interface IItemProps {
  caption: string;
  reference: string;
  icon: string;

  onSelect(e: string): void;
}

const Item = ({ caption, reference, icon, onSelect }: IItemProps) => {
  const classes = useWalletCardStyles({ provider: icon });

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
  visible?: boolean;
  address: string | undefined;
  provider: Providers | undefined;
  providers?: Record<string, any>;
  balance?: ReactNode;
}

export const WalletCard = ({
  className,
  address,
  provider,
  visible = true,
  providers = PROVIDERS,
  balance,
}: IWalletProps) => {
  const classes = useWalletCardStyles({ currentProvider: provider });
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
        classes.root,
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

            {balance && <div className={classes.balance}>{balance}</div>}
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
                  {isCopy ? (
                    <>
                      <CopiedIcon
                        className={classNames(classes.icon, classes.copied)}
                      />
                      {t('navigation.copied')}
                    </>
                  ) : (
                    <>
                      <CopyIcon className={classes.icon} />
                      {t('navigation.copy-address')}
                    </>
                  )}
                </Button>
              </CopyToClipboard>
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
