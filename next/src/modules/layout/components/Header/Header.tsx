import React from 'react';
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

export interface IHeaderProps {
  className?: string;
  isAuth?: boolean;
  displayName?: string;
  onUnlockWallet?: () => void;
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
  onUnlockWallet,
  displayName,
}: IHeaderProps) => {
  const classes = useHeaderStyles();

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

  const location = useLocation();

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
              onClick={onUnlockWallet}
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
  );
};

export const Header = (props: IHeaderProps) => <HeaderComponent {...props} />;
