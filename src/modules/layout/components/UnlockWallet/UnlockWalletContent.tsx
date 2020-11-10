import { Headline2 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import React, { useCallback } from 'react';
import { useUnlockWalletStyles } from './UnlockWalletStyles';
import { connect } from 'react-redux';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { PROVIDERS } from '../const';
import { Mutation } from '@redux-requests/react';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useIsXSDown } from '../../../../common/hooks/useTheme';

interface IItemProps {
  caption: string;
  icon: string;
  available: boolean;
  disabled?: boolean;
  onConnect?(): void;
}

const Item = ({
  onConnect,
  caption,
  icon,
  available,
  disabled,
}: IItemProps) => {
  const classes = useUnlockWalletStyles({ icon: icon, comingSoon: !available });
  const isXSDown = useIsXSDown();
  return (
    <li className={classes.item}>
      <Typography component="span" className={classes.caption}>
        {caption}
      </Typography>
      <Button
        classes={{
          root: classNames(
            classes.button,
            available ? classes.connect : classes.soon,
          ),
        }}
        onClick={available ? onConnect : () => null}
        color="primary"
        size="large"
        variant={isXSDown && !available ? 'text' : 'contained'}
        disabled={!available || disabled}
      >
        {available ? t('navigation.connect') : t('navigation.coming-soon')}
      </Button>
    </li>
  );
};

interface IUnlockWalletContentProps {
  onConnect?(): void;
  disabled?: boolean;
}

export const UnlockWalletContentComponent = ({
  providers,
  onConnect,
  disabled,
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
              available={item.available}
              disabled={disabled}
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
  connect: typeof UserActions.connect;
}

export const UnlockWalletContentImp = ({
  connect,
}: IUnlockWalletContentStoreProps) => {
  const handleConnectMetamask = useCallback(() => {
    connect();
  }, [connect]);

  return (
    <>
      <MutationErrorHandler type={UserActionTypes.CONNECT} />
      <Mutation type={UserActionTypes.CONNECT}>
        {({ loading }) => {
          return (
            <UnlockWalletContentComponent
              onConnect={handleConnectMetamask}
              providers={PROVIDERS}
              disabled={loading}
            />
          );
        }}
      </Mutation>
    </>
  );
};

export const UnlockWalletContent = connect(() => ({}), {
  connect: UserActions.connect,
})(UnlockWalletContentImp);
