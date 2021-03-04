import { Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { uid } from 'react-uid';
import { SOCIAL_LINK } from '../../../../common/const';
import { useIsLGUp } from '../../../../common/hooks/useTheme';
import { t } from '../../../../common/utils/intl';
import { NavLink } from '../../../../UiKit/NavLink';
import { Medium, Telegram, Twitter } from '../Icons/Icons';
import { useSocialStyles } from './SocialStyles';

interface ISocialItem {
  icon: JSX.Element;
  title?: string;
  href?: string;
  links?: {
    title: string;
    href: string;
  }[];
}

const SocialItem = ({ title, icon, href, links }: ISocialItem) => {
  const classes = useSocialStyles();
  const isLGUp = useIsLGUp();

  const renderTooltipContent = useCallback(
    (links: ISocialItem['links']) => (
      <div className={classes.linksMenu}>
        {links?.map(({ href, title }) => (
          <NavLink
            key={uid(title)}
            className={classes.linksItem}
            classes={{ label: classes.linksItemLabel }}
            href={href}
            color="secondary"
          >
            {title}
          </NavLink>
        ))}
      </div>
    ),
    [classes.linksItem, classes.linksItemLabel, classes.linksMenu],
  );

  const itemRegular = href ? (
    <li className={classes.item}>
      <NavLink
        className={classes.link}
        href={href}
        title={title}
        color="secondary"
      >
        {icon}
      </NavLink>
    </li>
  ) : null;

  const itemWithDropdown = links ? (
    <li className={classes.item}>
      <Tooltip
        classes={{
          tooltip: classes.tooltip,
        }}
        title={renderTooltipContent(links)}
        placement={isLGUp ? 'top-end' : 'top'}
        enterTouchDelay={0}
        leaveDelay={100}
        leaveTouchDelay={1000 * 60}
        interactive
      >
        <span className={classes.link} color="secondary">
          {icon}
        </span>
      </Tooltip>
    </li>
  ) : null;

  return links ? itemWithDropdown : itemRegular;
};

export const Social = ({ className }: { className?: string }) => {
  const classes = useSocialStyles();

  const socialList: ISocialItem[] = useMemo(
    () => [
      {
        title: t('social.twitter'),
        icon: <Twitter />,
        href: SOCIAL_LINK.twitter,
      },
      {
        icon: <Telegram />,
        links: [
          {
            title: t('social.telegram-chat'),
            href: SOCIAL_LINK.telegram,
          },
          {
            title: t('social.telegram-announcements'),
            href: SOCIAL_LINK.telegramAnnouncements,
          },
        ],
      },
      {
        title: t('social.medium'),
        icon: <Medium />,
        href: SOCIAL_LINK.medium,
      },
    ],
    [],
  );

  return (
    <div className={classNames(classes.component, className)}>
      <ul className={classes.list}>
        {socialList.map(item => (
          <SocialItem key={uid(item)} {...item} />
        ))}
      </ul>
    </div>
  );
};
