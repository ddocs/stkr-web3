import React, { SVGAttributes, useCallback, useState } from 'react';
import classNames from 'classnames';
import { NavLink } from '../../../../UiKit/NavLink';
import { t } from '../../../../common/utils/intl';
import {
  DOCS_LINK,
  GOVERNANCE_LINK,
  SOCIAL_LINK,
  LITEPAPER_LINK,
} from '../../../../common/const';
import { useLinksStyles } from './LinksStyles';
import { Button } from '../../../../UiKit/Button';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import { FoldableSection } from '../../../../UiKit/FoldableSection';
import { Medium, Telegram, Twitter } from '../Icons/Icons';
import { Tooltip } from '@material-ui/core';

export interface ILinksProps {
  className?: string;
}

const LINKS: Record<string, string | Record<string, string>> = {
  litepaper: LITEPAPER_LINK,
  community: {
    twitter: SOCIAL_LINK.twitter,
    'telegram-chat': SOCIAL_LINK.telegram,
    'telegram-announcements': SOCIAL_LINK.telegramAnnouncements,
    medium: SOCIAL_LINK.medium,
  },
  governance: GOVERNANCE_LINK,
  docs: DOCS_LINK,
};

const Arrow = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width={17} height={11} viewBox="0 0 17 11" fill="none" {...props}>
      <path d="M1 1l7.5 8L16 1" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
};

const getIconByKey = (key: string) => {
  switch (key) {
    case 'twitter':
      return <Twitter />;
    case 'telegram-chat':
      return <Telegram />;
    case 'telegram-announcements':
      return <Telegram />;
    case 'medium':
      return <Medium />;
  }
};

export const Links = ({ className }: ILinksProps) => {
  const classes = useLinksStyles();

  const [open, setOpen] = useState(false);

  const handleMobileOpen = useCallback(() => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [open]);

  const isMDDown = useIsSMDown();

  return (
    <div className={classNames(className, classes.component)}>
      <ul className={classes.list}>
        {Object.keys(LINKS).map(key => {
          const link = LINKS[key];
          return (
            <li key={key} className={classes.item}>
              {typeof link === 'string' ? (
                <Tooltip
                  title={t('coming-soon')}
                  disableHoverListener={link.startsWith('http')}
                  disableTouchListener={link.startsWith('http')}
                >
                  <NavLink
                    href={link.startsWith('http') ? link : ''}
                    className={classes.link}
                    color="secondary"
                    size="large"
                    disabled={!link.startsWith('http')}
                  >
                    {t(`navigation.${key}`)}
                  </NavLink>
                </Tooltip>
              ) : (
                <>
                  <Button
                    className={classNames(classes.link, classes.button)}
                    variant="text"
                    size="large"
                    color="secondary"
                    onClick={isMDDown ? handleMobileOpen : undefined}
                  >
                    {t(`navigation.${key}`)}
                    <Arrow className={classes.arrow} />
                  </Button>
                  <div className={classes.dropdown}>
                    <FoldableSection
                      open={isMDDown ? open : true}
                      timeout={300}
                      ssr={true}
                    >
                      <ul className={classes.subList}>
                        {Object.keys(link).map(subKey => (
                          <li key={subKey} className={classes.subItem}>
                            <NavLink
                              href={link[subKey]}
                              className={classes.subLink}
                              color="secondary"
                              variant="text"
                            >
                              {getIconByKey(subKey)}
                              {t(`navigation.${subKey}`)}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </FoldableSection>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
