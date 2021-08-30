import React from 'react';
import classNames from 'classnames';
import { uid } from 'react-uid';
import { useHeaderStyles } from './FooterStyles';
import { SOCIAL_LINK } from '../../../../../common/const';
import { Curtains } from '../../../../../UiKit/Curtains';
import { t, tHTML } from '../../../../../common/utils/intl';
import { NavLink } from '../../../../../UiKit/NavLink';
import { Social } from '../../../../layout/components/Social';

export interface IFooterProps {
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

export const Footer = ({ className }: IFooterProps) => {
  const classes = useHeaderStyles();

  const year = new Date().getFullYear();

  return (
    <footer
      className={classNames(
        classes.component,
        classes.componentAuth,
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
