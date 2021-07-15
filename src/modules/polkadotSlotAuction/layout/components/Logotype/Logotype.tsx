import { Box } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { ReactComponent as LogoIcon } from './assets/logo.svg';
import { Body2 } from '../../../../../UiKit/Typography';
import { NavLink } from '../../../../../UiKit/NavLink';
import { POLKADOT_SLOT_AUCTION_PATH } from '../../../../../common/const';
import { t } from '../../../../../common/utils/intl';
import { useLogotypeStyles } from './LogotypeStyles';

export interface ILogotypeProps {
  className?: string;
}

export const Logotype = ({ className }: ILogotypeProps) => {
  const classes = useLogotypeStyles();

  return (
    <Body2
      className={classNames(classes.component, className)}
      component="div"
      color="textPrimary"
    >
      <NavLink
        className={classes.link}
        activeClassName={classes.active}
        color="primary"
        href={POLKADOT_SLOT_AUCTION_PATH}
        exactMatch={true}
      >
        <LogoIcon />
      </NavLink>
      <Box display="flex" className={classes.company}>
        {t('polkadot-slot-auction.title')}
      </Box>
    </Body2>
  );
};
