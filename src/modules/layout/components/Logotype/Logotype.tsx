import React from 'react';
import classNames from 'classnames';
import { useLogotypeStyles } from './LogotypeStyles';
import { NavLink } from '../../../../UiKit/NavLink';
import { LogoIcon } from '../../../../UiKit/Icons/LogoIcon';
import { Body2 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { INDEX_PATH } from '../../../../common/const';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { isConnected } from '../../../../store/reducers/userReducer';

export interface ILogotypeProps {
  className?: string;
  isAuth?: boolean;
}

export const LogotypeComponent = ({ className, isAuth }: ILogotypeProps) => {
  const classes = useLogotypeStyles();

  const isSMDown = useIsSMDown();

  const visibleCaption = isAuth || !isSMDown;

  return (
    <Body2
      className={classNames(
        classes.component,
        visibleCaption && classes.withDivider,
        className,
      )}
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
      {visibleCaption && <span>{t('by-ankr')}</span>}
    </Body2>
  );
};

export const Logotype = connect(
  (state: IStoreState) => ({
    isAuth: isConnected(state.user),
  }),
  {},
)(LogotypeComponent);
