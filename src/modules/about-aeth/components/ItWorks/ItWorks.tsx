import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { t } from '../../../../common/utils/intl';
import { scrollToKey } from '../../../../common/utils/scrollToKey';
import { InView } from '../../../../components/InView';
import { Curtains } from '../../../../UiKit/Curtains';
import { IItWorksNavProps, ItWorksNav } from '../ItWorksNav';
import imgDeposit from './assets/deposit.svg';
import imgGetAeth from './assets/get-aeth.svg';
import imgRedeem from './assets/redeem.svg';
import imgUseAeth from './assets/use-aeth.svg';
import { useItWorksStyles } from './ItWorksStyles';

enum NavItemsKeys {
  deposit = 'deposit',
  get = 'getAeth',
  use = 'useAeth',
  redeem = 'redeem',
}

export const ItWorks = () => {
  const [activeNavKey, setActiveNavKey] = useState<NavItemsKeys>(
    NavItemsKeys.deposit,
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const classes = useItWorksStyles();

  const items: {
    key: NavItemsKeys;
    title: string;
    text: string;
    imgSrc: string;
  }[] = useLocaleMemo(
    () => [
      {
        key: NavItemsKeys.deposit,
        title: t('aeth-it-works.items.deposit.title'),
        text: t('aeth-it-works.items.deposit.text'),
        imgSrc: imgDeposit,
      },
      {
        key: NavItemsKeys.get,
        title: t('aeth-it-works.items.get-aeth.title'),
        text: t('aeth-it-works.items.get-aeth.text'),
        imgSrc: imgGetAeth,
      },
      {
        key: NavItemsKeys.use,
        title: t('aeth-it-works.items.use-aeth.title'),
        text: t('aeth-it-works.items.get-aeth.text'),
        imgSrc: imgUseAeth,
      },
      {
        key: NavItemsKeys.redeem,
        title: t('aeth-it-works.items.redeem.title'),
        text: t('aeth-it-works.items.redeem.text'),
        imgSrc: imgRedeem,
      },
    ],
    [],
  );

  const navClickHandler: IItWorksNavProps['onItemClick'] = key => {
    scrollToKey(key);
  };

  const renderedSpacers = useMemo(
    () =>
      items.map(({ key }, i) => {
        const setVisible = (isVisible: boolean) => {
          if (isVisible) {
            setActiveNavKey(key);
            setActiveIndex(i);
          }
        };

        return (
          <li className={classes.spacerItem} key={key} id={key}>
            <InView
              className={classes.spacerTrigger}
              setVisible={setVisible}
              rootMargin="-40% 0% -40% 0%"
            />
          </li>
        );
      }),
    [classes.spacerItem, classes.spacerTrigger, items],
  );

  const renderedImages = useMemo(
    () =>
      items.map(({ imgSrc, key, title }) => {
        return (
          <img
            src={imgSrc}
            alt={title}
            className={classNames(
              classes.img,
              classes[key],
              key === activeNavKey && classes.imgActive,
            )}
            key={key}
          />
        );
      }),
    [activeNavKey, classes, items],
  );

  const renderedItems = useMemo(
    () =>
      items.map(({ imgSrc, key, title, text }, i) => {
        const isActive = key === activeNavKey;
        const viewed = activeIndex - i > 0;

        return (
          <div
            className={classNames(
              classes.item,
              isActive && classes.itemActive,
              viewed && classes.itemViewed,
              !viewed && !isActive && classes.itemNotViewed,
            )}
            key={key}
          >
            <div className={classes.imgWrap}>
              <img
                src={imgSrc}
                alt={title}
                className={classNames(classes.img, classes[key])}
              />
            </div>

            <Typography
              className={classes.itemTitle}
              variant="h4"
              component="div"
            >
              {t(title)}
            </Typography>

            <Typography className={classes.itemText} component="p">
              {t(text)}
            </Typography>
          </div>
        );
      }),
    [activeIndex, activeNavKey, classes, items],
  );

  return (
    <section className={classes.root}>
      <Curtains>
        <div className={classes.scrollContainer}>
          <div className={classes.content}>
            <Typography className={classes.title} variant="h1" component="h2">
              {t('aeth-it-works.title')}
            </Typography>

            <div className={classes.contentGrid}>
              <ItWorksNav
                className={classes.nav}
                items={items}
                onItemClick={navClickHandler}
                activeKey={activeNavKey}
              />

              <div className={classes.colContent}>
                <div
                  className={classNames(
                    classes.imgWrap,
                    classes.imgWrapDesktopUp,
                  )}
                >
                  {renderedImages}
                </div>

                <div className={classes.mobileContent}>{renderedItems}</div>
              </div>
            </div>
          </div>

          <ul className={classes.spacers}>{renderedSpacers}</ul>
        </div>
      </Curtains>
    </section>
  );
};
