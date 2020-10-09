import React from 'react';
import classNames from 'classnames';
import { useHeaderStyles } from './HeaderStyles';
import { t } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { ITab, NavTab } from '../types';
import { Button } from '../../../../UiKit/Button';
import { Tabs } from '../Tabs';
import { PROVIDER_PATH, STAKER_PATH } from '../../../../common/const';
import { Logotype } from '../Logotype';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { isAuthenticated } from '../../../../store/reducers/userReducer';
import { openUnlockWalletAction } from '../../../../store/modals/actions';
import { useAction } from '../../../../store/redux';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import { Toggle } from '../Toggle';

interface IHeaderStoreProps {
  isAuth?: boolean;
  displayName?: string;
}

export interface IHeaderProps extends IHeaderStoreProps {
  className?: string;
}

const TABS: ITab[] = [
  {
    label: 'navigation.staker',
    value: NavTab.staker,
    href: STAKER_PATH,
  },
  {
    label: 'navigation.provider',
    value: NavTab.provider,
    href: PROVIDER_PATH,
  },
];

export const HeaderComponent = ({
  className,
  isAuth,
  displayName,
}: IHeaderProps) => {
  const classes = useHeaderStyles();

  const location = useLocation();

  const openUnlockWallet = useAction(openUnlockWalletAction);

  const isSMDown = useIsSMDown();

  return (
    <header
      className={classNames(
        classes.component,
        !isAuth && classes.outerComponent,
        className,
      )}
    >
      <Curtains className={isAuth ? classes.inner : classes.outer}>
        <Logotype className={classes.logo} />
        {isAuth ? (
          isSMDown ? (
            <Toggle />
          ) : (
            <>
              {[STAKER_PATH, PROVIDER_PATH].includes(location.pathname) && (
                <Tabs className={classes.tabs} values={TABS} />
              )}
              <div className={classes.wallet}>{displayName}</div>
            </>
          )
        ) : (
          <Button
            onClick={openUnlockWallet}
            className={classes.button}
            color="primary"
            size={!isSMDown ? 'large' : 'medium'}
          >
            {t('navigation.unlock-wallet')}
          </Button>
        )}
      </Curtains>
    </header>
  );
};

export const Header = connect(
  (state: IStoreState) => ({
    isAuth: isAuthenticated(state.user),
    displayName: state.user.userInfo?.displayName,
  }),
  {},
)(HeaderComponent);
