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

const ENABLE_WALLET_CONNECT = false;

interface IUnlockWalletContentProps {
  onConnect?(): void;
}

export const PROVIDERS: Record<string, string> = {
  metamask: 'providers.metamask',
  ...(ENABLE_WALLET_CONNECT ? { wallet: 'providers.wallet' } : {}),
};

export const providersKeys = Object.keys(PROVIDERS);

export const UnlockWalletContentComponent = ({
  onConnect,
}: IUnlockWalletContentProps) => {
  const classes = useUnlockWalletStyles();

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
                onClick={onConnect}
                color="primary"
                size="large"
              >
                {t('navigation.connect')}
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
  const handleConnectMetamask = useCallback(() => {
    signIn();
  }, [signIn]);

  return <UnlockWalletContentComponent onConnect={handleConnectMetamask} />;
};

export const UnlockWalletContent = connect((state: IStoreState) => {}, {
  signIn: UserActions.signIn,
})(UnlockWalletContentImp);
