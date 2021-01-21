import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { useRouteMatch } from 'react-router';
import {
  INDEX_PATH,
  PROVIDER_PATH,
  STAKER_PATH,
} from '../../../../common/const';
import { NavLink } from '../../../../UiKit/NavLink';
import { Body2 } from '../../../../UiKit/Typography';
import { ReactComponent as LogoIcon } from './assets/logo.svg';
import { useLogotypeStyles } from './LogotypeStyles';

const useLogoHref = () => {
  const isStaker = useRouteMatch({ path: STAKER_PATH });
  const isProvider = useRouteMatch({ path: PROVIDER_PATH });

  if (isStaker) {
    return STAKER_PATH;
  }

  if (isProvider) {
    return PROVIDER_PATH;
  }

  return INDEX_PATH;
};

export interface ILogotypeProps {
  className?: string;
}

export const Logotype = ({ className }: ILogotypeProps) => {
  const classes = useLogotypeStyles();
  const href = useLogoHref();

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
        href={href}
        exactMatch={true}
      >
        <LogoIcon />
      </NavLink>

      <Typography className={classes.company}>Staking</Typography>
    </Body2>
  );
};
