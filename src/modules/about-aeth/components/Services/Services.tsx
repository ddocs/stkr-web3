import React, { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { Grid, Typography } from '@material-ui/core';
import { t } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { ServicesLogoNameType } from '../ServicesLogo';
import { ServicesItem } from '../ServicesItem';
import { useServicesStyles } from './ServicesStyles';
import { useIntersectionObserver } from '../../../../common/hooks/useIntersectionObserver';

const services: ServicesLogoNameType[] = [
  'uniswap',
  'metamask',
  'onx',
  'bitkeep',
  'trustwallet',
  'imtoken',
  'standcash',
  'onto',
  'snowswap',
];

export const Services = () => {
  const classes = useServicesStyles();
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useIntersectionObserver((visible: boolean) => setVisible(visible), gridRef, {
    once: true,
    rootMargin: '0% 0% -20% 0%',
  });

  const renderedItems = useMemo(
    () =>
      services.map((serviceName, i) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={serviceName}
          className={classNames(
            classes.serviceWithAnimation,
            isVisible && classes.serviceAnimated,
          )}
          style={{
            transitionDelay: `${i * 0.1}s`,
          }}
        >
          <ServicesItem
            className={classes.servicesItem}
            logo={serviceName}
            text={t(`aeth-ecosystem.services.${serviceName}`)}
          />
        </Grid>
      )),
    [
      classes.serviceAnimated,
      classes.serviceWithAnimation,
      classes.servicesItem,
      isVisible,
    ],
  );

  return (
    <section className={classes.root}>
      <Curtains>
        <Typography className={classes.subtitle} color="textSecondary">
          {t('aeth-ecosystem.subtitle')}
        </Typography>

        <Typography className={classes.title} variant="h1" component="h2">
          {t('aeth-ecosystem.title')}
        </Typography>

        <Grid container spacing={3} ref={gridRef}>
          {renderedItems}
        </Grid>
      </Curtains>
    </section>
  );
};
