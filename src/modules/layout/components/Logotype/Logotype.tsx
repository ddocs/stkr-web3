import React from 'react';
import classNames from 'classnames';
import { useLogotypeStyles } from './LogotypeStyles';
import { NavLink } from '../../../../UiKit/NavLink';
import { Body2 } from '../../../../UiKit/Typography';
import {
  INDEX_PATH,
  PROVIDER_PATH,
  STAKER_PATH,
} from '../../../../common/const';
import { useRouteMatch } from 'react-router';
import { ReactComponent as LogoIcon } from './assets/logo.svg';

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
      color="secondary"
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
    </Body2>
  );
};
