import { Headline2 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { CustomDialog } from '../../../../components/CustomDialog';
import React from 'react';
import { useUnlockWalletStyles } from './UnlockWalletStyles';

enum Providers {
  metamask = 'metamask',
  wallet = 'wallet',
}

interface IUnlockWalletProps {
  open: boolean;
  onClose(): void;
  onConnectMetamask?(): void;
  onConnectWallet?(): void;
  onInstallMetamask?(): void;
}

const PROVIDERS: Record<string, string> = {
  metamask: 'providers.metamask',
  wallet: 'providers.wallet',
};

const metaMaskAvailable = () => typeof window.ethereum !== 'undefined';

export const UnlockWallet = ({
  open,
  onClose,
  onConnectMetamask,
  onInstallMetamask,
  onConnectWallet,
}: IUnlockWalletProps) => {
  const classes = useUnlockWalletStyles();

  const hasMetaMask = metaMaskAvailable();

  const providersKeys = Object.keys(PROVIDERS);

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      transitionOpacity={true}
      maxWidth="sm"
    >
      <div className={classes.content}>
        <Headline2 className={classes.title}>
          {t('navigation.select-wallet-provider')}
        </Headline2>
        <ul className={classes.list}>
          {providersKeys.map(key => {
            return (
              <li key={key} className={classes.item}>
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
    </CustomDialog>
  );
};
