import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { PROVIDER_PATH, STAKER_DASHBOARD_PATH } from '../../../../common/const';
import { Providers } from '../../../../common/types';
import { Links } from '../Links';
import { LocaleSwitcher } from '../LocaleSwitcher';
import { Switcher } from '../Switcher';
import { Wallet } from '../Wallet';
import { HeaderFrame } from './HeaderFrame';
import { useHeaderStyles } from './HeaderStyles';

const SHOW_SWITCHER_ON_ALL_PAGES = true;

export type IAuthorizedHeaderProps = {
  className?: string;
  walletAddress: string | undefined;
  walletType: Providers | undefined;
  ethereumBalance?: BigNumber;
  ankrBalance?: BigNumber;
};

export const AuthorizedHeader = ({
  className,
  walletAddress,
  walletType,
  ethereumBalance,
  ankrBalance,
}: IAuthorizedHeaderProps) => {
  const classes = useHeaderStyles({});

  const location = useLocation();

  const switcherPaths = useMemo(
    () => [STAKER_DASHBOARD_PATH, PROVIDER_PATH],
    [],
  );

  const showSwitcher = useMemo(
    () =>
      SHOW_SWITCHER_ON_ALL_PAGES ||
      switcherPaths.find(path => location.pathname.startsWith(path)),
    [location.pathname, switcherPaths],
  );

  return (
    <HeaderFrame
      outerClassName={className}
      innerClassName={classNames(classes.inner, classes.innerAuthorized)}
      dropdownClassName={classes.mobileAuth}
    >
      <div className={classes.switcherWrap}>
        <LocaleSwitcher />
      </div>

      <Wallet
        className={classes.wallet}
        ethereumBalance={ethereumBalance}
        ankrBalance={ankrBalance}
        address={walletAddress}
        provider={walletType}
      />

      <Box display="flex" alignItems="center" pl={{ lg: showSwitcher ? 2 : 0 }}>
        {showSwitcher && <Switcher />}
      </Box>

      <Box m={{ lg: 'auto' }}>
        <Links
          className={classNames(classes.links, classes.linksAuthorized)}
          isAuth
        />
      </Box>
    </HeaderFrame>
  );
};
