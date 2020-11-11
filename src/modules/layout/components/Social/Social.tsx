import React from 'react';
import classNames from 'classnames';
import { useSocialStyles } from './SocialStyles';
import { uid } from 'react-uid';
import { NavLink } from '../../../../UiKit/NavLink';
import { SOCIAL_LINK } from '../../../../common/const';
import { Medium, Telegram, Twitter } from '../Icons/Icons';

const SOCIAL_LIST = [
  {
    href: SOCIAL_LINK.twitter,
    title: 'twitter',
    icon: <Twitter />,
  },
  {
    href: SOCIAL_LINK.telegram,
    title: 'telegram',
    icon: <Telegram />,
  },
  {
    href: SOCIAL_LINK.medium,
    title: 'medium',
    icon: <Medium />,
  },
];

export const Social = ({ className }: { className?: string }) => {
  const classes = useSocialStyles();

  return (
    <div className={classNames(classes.component, className)}>
      <ul className={classes.list}>
        {SOCIAL_LIST.map(item => {
          return (
            <li key={uid(item)} className={classes.item}>
              <NavLink
                className={classes.link}
                href={item.href}
                title={item.title}
                color="secondary"
              >
                {item.icon}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
