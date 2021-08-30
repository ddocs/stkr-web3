import React from 'react';
import { Link, useMediaQuery } from '@material-ui/core';

import { useStyles } from './Styles';
import SectionWrapper from '../SectionWrapper/SectionWrapper';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpened: boolean;
}

const Header = ({ onMenuToggle, isMenuOpened }: HeaderProps) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <SectionWrapper needTimeout={false}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <Link href="/">
            {isMobile ? (
              <img src="/landing/logoMobile.svg" width={32} alt="logo" />
            ) : (
              <img src="/landing/logo.svg" width={103} alt="logo" />
            )}
          </Link>
          <div className={classes.divider} />
          <div>Polkadot Parachain Bonds</div>
        </div>
        <div className={classes.menu} onClick={onMenuToggle}>
          {isMenuOpened ? 'Close' : 'Menu'}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Header;
