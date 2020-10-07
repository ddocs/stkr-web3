import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useHeaderStyles } from './HeaderStyles';
import { NavLink } from '../../../../UiKit/Link';
import { t } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { ITab, NavTab } from '../types';
import { Button } from '../../../../UiKit/Button';
import { Tabs } from '../Tabs';
import {
  INDEX_PATH,
  PROVIDER_PATH,
  STAKER_PATH,
} from '../../../../common/const';
import { Logotype } from '../Logotype';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { isAuthenticated } from '../../../../store/reducers/userReducer';
import { UserActions } from '../../../../store/actions/UserActions';
import { UnlockWallet } from '../UnlockWallet';

interface IHeaderStoreProps {
  isAuth?: boolean;
  displayName?: string;
  signIn: typeof UserActions.signIn;
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

const LINKS = [
  {
    label: 'navigation.about',
    href: INDEX_PATH,
  },
  {
    label: 'navigation.whitepaper-en',
    href: 'https://assets.ankr.com/files/stkr_whitepaper.pdf',
  },
  {
    label: 'navigation.whitepaper-ch',
    href: 'https://assets.ankr.com/files/stkr_whitepaper_cn.pdf',
  },
];

export const HeaderComponent = ({
  className,
  isAuth,
  displayName,
  signIn,
}: IHeaderProps) => {
  const classes = useHeaderStyles();

  const location = useLocation();

  const [isOpen, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    if (isOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isOpen]);

  const handleConnectWallet = useCallback(() => {
    alert('Connect wallet');
    signIn();
  }, [signIn]);

  const handleConnectMetamask = useCallback(() => {
    alert('Connect metamask');
    signIn();
  }, [signIn]);

  const handleInstallMetamask = useCallback(() => {
    alert('Install wallet');
    signIn();
  }, [signIn]);

  return (
    <>
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
            <>
              {[STAKER_PATH, PROVIDER_PATH].includes(location.pathname) && (
                <Tabs className={classes.tabs} values={TABS} />
              )}
              <div className={classes.wallet}>{displayName}</div>
            </>
          ) : (
            <>
              <ul className={classes.list}>
                {LINKS.map(link => (
                  <li className={classes.item}>
                    <NavLink
                      className={classes.link}
                      activeClassName={classes.active}
                      href={link.href}
                      size="large"
                      color="secondary"
                    >
                      {t(link.label)}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <Button
                onClick={handleOpen}
                className={classes.button}
                color="primary"
                size="large"
              >
                {t('navigation.unlock-wallet')}
              </Button>
            </>
          )}
        </Curtains>
      </header>
      {isOpen && !isAuth && (
        <UnlockWallet
          open={isOpen}
          onClose={handleClose}
          onConnectMetamask={handleConnectMetamask}
          onInstallMetamask={handleInstallMetamask}
          onConnectWallet={handleConnectWallet}
        />
      )}
    </>
  );
};

export const Header = connect(
  (state: IStoreState) => ({
    isAuth: isAuthenticated(state.user),
    displayName: state.user.userInfo?.displayName,
  }),
  {
    signIn: UserActions.signIn,
  },
)(HeaderComponent);
