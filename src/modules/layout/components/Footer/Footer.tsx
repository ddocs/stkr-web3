import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { uid } from 'react-uid';
import { SOCIAL_LINK } from '../../../../common/const';
import { t, tHTML } from '../../../../common/utils/intl';
import { IStoreState } from '../../../../store/reducers';
import { isConnected } from '../../../../store/reducers/userReducer';
import { Curtains } from '../../../../UiKit/Curtains';
import { NavLink } from '../../../../UiKit/NavLink';
import { Social } from '../Social';
import { useHeaderStyles } from './FooterStyles';

interface IFooterStoreProps {
  isAuth: boolean;
}

export interface IFooterProps extends IFooterStoreProps {
  className?: string;
}

const LINKS = [
  {
    label: 'navigation.whitepaper-en',
    href: SOCIAL_LINK.whitepaperEn,
  },
  {
    label: 'navigation.whitepaper-ch',
    href: SOCIAL_LINK.whitepaperCh,
  },
];

export const FooterComponent = ({ className, isAuth }: IFooterProps) => {
  const classes = useHeaderStyles();

  const year = new Date().getFullYear();

  return (
    <footer
      className={classNames(
        classes.component,
        isAuth && classes.componentAuth,
        className,
      )}
    >
      <Curtains classes={{ root: classes.wrapper }}>
        <p className={classes.copyright}>
          {tHTML('navigation.copyright', { year: year })}
        </p>

        <ul className={classes.list}>
          {LINKS.map(link => (
            <li className={classes.item} key={uid(link)}>
              <NavLink
                className={classes.link}
                activeClassName={classes.active}
                href={link.href}
                size="small"
                color="secondary"
              >
                {t(link.label)}
              </NavLink>
            </li>
          ))}
        </ul>

        <Social className={classes.social} />
      </Curtains>
    </footer>
  );
};

export const Footer = connect(
  (state: IStoreState) => ({
    isAuth: isConnected(state.user),
  }),
  {},
)(FooterComponent);
