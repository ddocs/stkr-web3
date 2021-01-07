import { useHeaderStyles } from './HeaderStyles';
import { useLocation } from 'react-router';
import { PROVIDER_PATH, STAKER_DASHBOAR_PATH, } from '../../../../common/const';
import React, { useMemo } from 'react';
import { HeaderFrame } from './HeaderFrame';
import { Providers } from '../../../../common/types';
import { Wallet } from '../Wallet';
import { Links } from '../Links';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import { Box } from '@material-ui/core';
import { LocaleSwitcher } from '../LocaleSwitcher';
import { Switcher } from '../Switcher';
import BigNumber from "bignumber.js";

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
  const isSMDown = useIsSMDown();

  const switcherPaths = useMemo(
    () => [STAKER_DASHBOAR_PATH, PROVIDER_PATH],
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
      innerClassName={classes.inner}
      dropdownClassName={classes.authDropdown}
    >
      {isSMDown && <Links className={classes.links} />}
      <Box display="flex" alignItems="center" pl={{ xs: 2 }}>
        {showSwitcher && <Switcher />}
      </Box>
      <Wallet
        className={classes.wallet}
        ethereumBalance={ethereumBalance}
        ankrBalance={ankrBalance}
        address={walletAddress}
        provider={walletType}
      />
      <Box
        display="flex"
        alignItems="center"
        ml={{ xs: 'auto' }}
        mb={{ xs: 3, md: 0 }}
      >
        <LocaleSwitcher />
      </Box>
    </HeaderFrame>
  );
};
