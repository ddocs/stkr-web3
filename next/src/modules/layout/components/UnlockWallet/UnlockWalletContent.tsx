import { Headline2 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import React, { useCallback } from 'react';
import { useUnlockWalletStyles } from './UnlockWalletStyles';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { UserActions } from '../../../../store/actions/UserActions';
import { PROVIDERS } from '../const';

interface IItemProps {
  caption: string;
  icon: string;
  enable: boolean;

  onConnect?(): void;
}

const Item = ({ onConnect, caption, icon, enable }: IItemProps) => {
  const classes = useUnlockWalletStyles({ icon: icon });

  return (
    <li className={classes.item}>
      {caption}
      <Button
        className={classes.button}
        onClick={enable ? onConnect : () => null}
        color="primary"
        size="large"
        disabled={!enable}
      >
        {enable ? t('navigation.connect') : t('navigation.coming-soon')}
      </Button>
    </li>
  );
};

interface IUnlockWalletContentProps {
  onConnect?(): void;
}

export const UnlockWalletContentComponent = ({
  providers,
  onConnect,
}: IUnlockWalletContentProps & { providers: Record<string, any> }) => {
  const providersKeys = Object.keys(providers);

  const classes = useUnlockWalletStyles({ count: providersKeys.length });

  return (
    <div className={classes.content}>
      <Headline2 className={classes.title} component="h2">
        {t('navigation.select-wallet-provider')}
      </Headline2>
      <ul className={classes.list}>
        {providersKeys.map(key => {
          const item = providers[key];
          return (
            <Item
              key={key}
              enable={item.available}
              caption={t(item.caption)}
              onConnect={onConnect}
              icon={key}
            />
          );
        })}
      </ul>
    </div>
  );
};

interface IUnlockWalletContentStoreProps {
  signIn: typeof UserActions.connect;
}

export const UnlockWalletContentImp = ({
  signIn,
}: IUnlockWalletContentStoreProps) => {
  const handleConnectMetamask = useCallback(() => {
    signIn();
  }, [signIn]);

  return (
    <UnlockWalletContentComponent
      onConnect={handleConnectMetamask}
      providers={PROVIDERS}
    />
  );
};

export const UnlockWalletContent = connect((state: IStoreState) => {}, {
  signIn: UserActions.connect,
})(UnlockWalletContentImp);
