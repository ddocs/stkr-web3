import React from 'react';
import classNames from 'classnames';
import { useHeaderStyles } from './FooterStyles';
import { NavLink } from '../../../../UiKit/Link';
import { t, tHTML } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { isConnected } from '../../../../store/reducers/userReducer';
import { uid } from 'react-uid';
import { Body2 } from '../../../../UiKit/Typography';
import { Social } from '../Social';
import { SOCIAL_LINK } from '../../../../common/const';

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

  return !isAuth ? (
    <footer className={classNames(classes.component, className)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <Body2 className={classes.copyright} component="p" color="secondary">
          {tHTML('navigation.copyright', { year: year })}
        </Body2>
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
  ) : null;
};

export const Footer = connect(
  (state: IStoreState) => ({
    isAuth: isConnected(state.user),
  }),
  {},
)(FooterComponent);
