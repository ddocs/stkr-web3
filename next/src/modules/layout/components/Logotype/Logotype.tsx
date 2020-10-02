import React from 'react';
import classNames from 'classnames';
import { useLogotypeStyles } from './LogotypeStyles';
import { NavLink } from '../../../../UiKit/Link';
import { LogoIcon } from '../../../../UiKit/Icons/LogoIcon';
import { Body1 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { INDEX_PATH } from '../../../../common/const';

export interface IHeaderProps {
  className?: string;
  isAuth?: boolean;
}

export const Logotype = ({ className, isAuth }: IHeaderProps) => {
  const classes = useLogotypeStyles();

  return (
    <Body1
      className={classNames(classes.component, className)}
      component="div"
      color="secondary"
    >
      <NavLink
        className={classes.link}
        activeClassName={classes.active}
        href={INDEX_PATH}
        color="primary"
      >
        <LogoIcon />
      </NavLink>
      <span>{t('by-ankr')}</span>
    </Body1>
  );
};
