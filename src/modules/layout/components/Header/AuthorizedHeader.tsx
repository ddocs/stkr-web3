import { useHeaderStyles } from './HeaderStyles';
import { useLocation } from 'react-router';
import { PROVIDER_PATH, STAKER_DASHBOAR_PATH } from '../../../../common/const';
import { Tabs } from '../Tabs';
import React from 'react';
import { HeaderFrame } from './HeaderFrame';
import { Providers } from '../../../../common/types';
import { ITab, NavTab } from '../types';
import { Wallet } from '../Wallet';
import { Links } from '../Links';
import { useIsSMDown } from '../../../../common/hooks/useTheme';

const SHOW_SWITCHER_ON_ALL_PAGES = true;
const ENABLE_SWITCHER = false;

export type IAuthorizedHeaderProps = {
  className?: string;
  walletAddress: string | undefined;
  walletType: Providers | undefined;
  ethereumBalance: string | undefined;
  ankrBalance: string | undefined;
};

const TABS: ITab[] = [
  {
    label: 'navigation.staker',
    value: NavTab.staker,
    href: STAKER_DASHBOAR_PATH,
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
}: IAuthorizedHeaderProps) => {
  const classes = useHeaderStyles({});

  const location = useLocation();

  const isSMDown = useIsSMDown();

  return (
    <HeaderFrame
      outerClassName={className}
      innerClassName={classes.inner}
      dropdownClassName={classes.authDropdown}
    >
      {isSMDown && <Links className={classes.links} />}
      {ENABLE_SWITCHER &&
        ([STAKER_DASHBOAR_PATH, PROVIDER_PATH].includes(location.pathname) ||
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
    </HeaderFrame>
  );
};
