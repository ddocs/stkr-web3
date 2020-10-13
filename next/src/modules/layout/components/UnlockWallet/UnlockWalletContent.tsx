import { Headline2 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import React, { useCallback } from 'react';
import { useUnlockWalletStyles } from './UnlockWalletStyles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { UserActions } from '../../../../store/actions/UserActions';
import { Providers } from '../../../../common/types';

interface IUnlockWalletContentProps {
  onConnectMetamask?(): void;

  onConnectWallet?(): void;

  onInstallMetamask?(): void;
}

export const PROVIDERS: Record<string, string> = {
  metamask: 'providers.metamask',
  wallet: 'providers.wallet',
};

export const providersKeys = Object.keys(PROVIDERS);

const metaMaskAvailable = () => typeof window.ethereum !== 'undefined';

export const UnlockWalletContentComponent = ({
  onConnectMetamask,
  onInstallMetamask,
  onConnectWallet,
}: IUnlockWalletContentProps) => {
  const classes = useUnlockWalletStyles();

  const hasMetaMask = metaMaskAvailable();

  return (
    <div className={classes.content}>
      <Headline2 className={classes.title} component="h2">
        {t('navigation.select-wallet-provider')}
      </Headline2>
      <ul className={classes.list}>
        {providersKeys.map(key => {
          return (
            <li
              key={key}
              className={classNames(
                classes.item,
                key === Providers.metamask && classes.itemMetaMask,
                key === Providers.wallet && classes.itemConnectWallet,
              )}
            >
              {t(PROVIDERS[key])}
              <Button
                className={classes.button}
                onClick={
                  key === Providers.metamask
                    ? !hasMetaMask
                      ? onConnectMetamask
                      : onInstallMetamask
                    : onConnectWallet
                }
                color="primary"
                size="large"
              >
                {key === Providers.metamask && !hasMetaMask
                  ? t('navigation.install')
                  : t('navigation.connect')}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

interface IUnlockWalletContentStoreProps {
  signIn: typeof UserActions.signIn;
}

export const UnlockWalletContentImp = ({
  signIn,
}: IUnlockWalletContentStoreProps) => {
  const handleConnectWallet = useCallback(() => {
    signIn();
  }, [signIn]);

  const handleConnectMetamask = useCallback(() => {
    signIn();
  }, [signIn]);

  const handleInstallMetamask = useCallback(() => {
    signIn();
  }, [signIn]);

  return (
    <UnlockWalletContentComponent
      onConnectMetamask={handleConnectMetamask}
      onInstallMetamask={handleInstallMetamask}
      onConnectWallet={handleConnectWallet}
    />
  );
};

export const UnlockWalletContent = connect((state: IStoreState) => {}, {
  signIn: UserActions.signIn,
})(UnlockWalletContentImp);
