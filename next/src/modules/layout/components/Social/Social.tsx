import React from 'react';
import classNames from 'classnames';
import { useSocialStyles } from './SocialStyles';
import { uid } from 'react-uid';
import { NavLink } from '../../../../UiKit/NavLink';
import { SOCIAL_LINK } from '../../../../common/const';
import { t } from '../../../../common/utils/intl';

const Twitter = (props: React.SVGAttributes<any>) => {
  return (
    <svg width={26} height={20} viewBox="0 0 26 20" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.39 2.37c-.907.4-1.88.671-2.902.793A5.051 5.051 0 0024.707.367c-.977.58-2.057 1-3.207 1.227A5.052 5.052 0 0012.894 6.2 14.33 14.33 0 012.484.922a5.035 5.035 0 00-.683 2.538c0 1.752.893 3.298 2.248 4.202a5.04 5.04 0 01-2.288-.632v.063a5.052 5.052 0 004.051 4.951 5.07 5.07 0 01-2.281.085 5.057 5.057 0 004.716 3.507A10.13 10.13 0 011.974 17.8c-.408 0-.808-.026-1.205-.07A14.294 14.294 0 008.512 20c9.29 0 14.37-7.695 14.37-14.37 0-.22-.005-.436-.016-.653a10.215 10.215 0 002.52-2.615l.004.007z"
        fill="currentColor"
      />
    </svg>
  );
};

const Facebook = (props: React.SVGAttributes<any>) => {
  return (
    <svg width={21} height={22} viewBox="0 0 21 22" fill="none" {...props}>
      <path
        d="M19.843 21.008c.644 0 1.157-.522 1.157-1.158V1.158C21 .514 20.479 0 19.843 0H1.157C.522 0 0 .522 0 1.158V19.85c0 .644.522 1.158 1.157 1.158h18.686z"
        fill="currentColor"
      />
      <path
        d="M14.489 21.008v-8.136h2.73l.407-3.171H14.49V7.679c0-.921.253-1.54 1.573-1.54h1.678V3.292c-.293-.04-1.287-.122-2.444-.122-2.42 0-4.075 1.475-4.075 4.19v2.34H8.483v3.17h2.738v8.137h3.268z"
        fill="#151515"
      />
    </svg>
  );
};

const SOCIAL_LIST = [
  {
    href: SOCIAL_LINK.twitter,
    title: 'twitter',
    icon: <Twitter />,
  },
  {
    href: SOCIAL_LINK.facebook,
    title: 'facebook',
    icon: <Facebook />,
  },
];

export const Social = ({ className }: { className?: string }) => {
  const classes = useSocialStyles();

  return (
    <div className={classNames(classes.component, className)}>
      {t('navigation.share')}
      <ul className={classes.list}>
        {SOCIAL_LIST.map(item => {
          return (
            <li className={classes.item}>
              <NavLink
                key={uid(item)}
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
