import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { INDEX_PATH } from '../../../../common/const';
import { NavLink } from '../../../../UiKit/NavLink';
import { Body2 } from '../../../../UiKit/Typography';
import { ReactComponent as LogoIcon } from './assets/logo.svg';
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
        href={INDEX_PATH}
        exactMatch={true}
      >
        <LogoIcon />
      </NavLink>

      <Typography className={classes.company}>Staking</Typography>
    </Body2>
  );
};
