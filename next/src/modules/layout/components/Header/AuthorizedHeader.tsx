import { useHeaderStyles } from './HeaderStyles';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { useLocation } from 'react-router';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import { Toggle } from '../Toggle';
import { PROVIDER_PATH, STAKER_PATH } from '../../../../common/const';
import { Tabs } from '../Tabs';
import React from 'react';
import { HeaderFrame } from './HeaderFrame';
import { UserActions } from '../../../../store/actions/UserActions';
import { Providers } from '../../../../common/types';
import { ITab, NavTab } from '../types';
import { Wallet } from '../Wallet';

const SHOW_SWITCHER_ON_ALL_PAGES = true;

export type IAuthorizedHeaderProps = {
  className?: string;
  fetchUserInfo: typeof UserActions.fetchUserInfo;
  walletAddress: string | undefined;
  walletType: Providers | undefined;
  ethereumBalance: number | undefined;
  ankrBalance: number | undefined;
};

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

export const AuthorizedHeader = ({
  className,
  walletAddress,
  walletType,
  ethereumBalance,
  ankrBalance,
  fetchUserInfo,
}: IAuthorizedHeaderProps) => {
  const classes = useHeaderStyles();

  useInitEffect(() => {
    fetchUserInfo();
  });

  const location = useLocation();

  const isSMDown = useIsSMDown();

  return (
    <HeaderFrame outerClassName={className} innerClassName={classes.inner}>
      {isSMDown ? (
        <Toggle />
      ) : (
        <>
          {([STAKER_PATH, PROVIDER_PATH].includes(location.pathname) ||
            SHOW_SWITCHER_ON_ALL_PAGES) && (
            <Tabs className={classes.tabs} values={TABS} />
          )}
          <Wallet
            className={classes.wallet}
            ethereumBalance={ethereumBalance}
            ankrBalance={ankrBalance}
            address={walletAddress}
            provider={walletType}
          />
        </>
      )}
    </HeaderFrame>
  );
};
