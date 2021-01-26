import { Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import React, { SVGAttributes, useCallback, useMemo, useState } from 'react';
import {
  DOCS_LINK,
  GOVERNANCE_PROJECT_LIST_PATH,
  LITEPAPER_LINK,
  PROVIDER_PATH,
  SOCIAL_LINK,
  STAKER_DASHBOARD_PATH,
} from '../../../../common/const';
import { useIsMDDown } from '../../../../common/hooks/useTheme';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { FoldableSection } from '../../../../UiKit/FoldableSection';
import { NavLink } from '../../../../UiKit/NavLink';
import { Medium, Telegram, Twitter } from '../Icons/Icons';
import { useLinksStyles } from './LinksStyles';

export interface ILinksProps {
  className?: string;
  isAuth?: boolean;
}

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

export const Links = ({ className, isAuth }: ILinksProps) => {
  const isMDDown = useIsMDDown();
  const classes = useLinksStyles();
  const [open, setOpen] = useState(false);

  const handleMobileOpen = useCallback(() => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [open]);

  const LINKS: Record<string, string | Record<string, string>> = useMemo(
    () => ({
      litepaper: LITEPAPER_LINK,
      community: {
        twitter: SOCIAL_LINK.twitter,
        'telegram-chat': SOCIAL_LINK.telegram,
        'telegram-announcements': SOCIAL_LINK.telegramAnnouncements,
        medium: SOCIAL_LINK.medium,
      },
      docs: DOCS_LINK,
      governance: isAuth ? GOVERNANCE_PROJECT_LIST_PATH : '',
      staker: isAuth && isMDDown ? STAKER_DASHBOARD_PATH : '',
      provider: isAuth && isMDDown ? PROVIDER_PATH : '',
    }),
    [isAuth, isMDDown],
  );

  return (
    <div className={classNames(className, classes.component)}>
      <ul className={classes.list}>
        {Object.keys(LINKS).map(key => {
          const link = LINKS[key];

          if (link.length === 0) {
            return null;
          }

          return (
            <li key={key} className={classes.item}>
              {typeof link === 'string' ? (
                <Tooltip
                  title={t('coming-soon')}
                  disableHoverListener={!!link}
                  disableTouchListener={!!link}
                >
                  <NavLink
                    href={link}
                    className={classes.link}
                    color="secondary"
                    size="large"
                    disabled={!link}
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
