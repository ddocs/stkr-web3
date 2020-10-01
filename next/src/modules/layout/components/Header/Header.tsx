import React from 'react';
import classNames from 'classnames';
import { useHeaderStyles } from './HeaderStyles';
import { NavLink } from '../../../../UiKit/Link';
import { LogoIcon } from '../../../../UiKit/Icons/LogoIcon';
import { Body1 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';

export interface IHeaderProps {
  className?: string;
  isAuth?: boolean;
}

export const HeaderComponent = ({ className, isAuth }: IHeaderProps) => {
  const classes = useHeaderStyles();
  return (
    <header className={classNames(classes.component, className)}>
      <Curtains className={classes.wrapper}>
        <Body1 className={classes.logo} component="p" color="secondary">
          <NavLink className={classes.link} href={'/'}>
            <LogoIcon />
          </NavLink>
          <span>{t('by-ankr')}</span>
        </Body1>
        <div className={classes.tabs} />
        <div className={classes.wallet} />
      </Curtains>
    </header>
  );
};

export const Header = (props: IHeaderProps) => <HeaderComponent {...props} />;
