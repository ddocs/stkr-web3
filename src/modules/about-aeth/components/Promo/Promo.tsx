import React from 'react';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import { Curtains } from '../../../../UiKit/Curtains';
import { t, tHTML } from '../../../../common/utils/intl';
import { ReactComponent as EthereumLogoImg } from './assets/ethereum-logo.svg';
import { usePromoStyles } from './PromoStyles';
import { usePromo } from './usePromo';

export const Promo = () => {
  const classes = usePromoStyles();
  const { imgRef, textRef, isImgVisible, isTextVisible } = usePromo();

  return (
    <section className={classes.root}>
      <Curtains>
        <div
          className={classNames(
            classes.img,
            classes.imgHorizon,
            classes.imgShadow,
            classes.imgWithAnimation,
            isImgVisible && classes.imgAnimated,
          )}
          ref={imgRef}
        >
          <EthereumLogoImg />
        </div>

        <div
          className={classNames(
            classes.textContent,
            classes.textContentWithAnimation,
            isTextVisible && classes.textContentAnimated,
          )}
          ref={textRef}
        >
          <Typography variant="h1" className={classes.title}>
            {t('aeth-promo.title')}
          </Typography>

          <Typography className={classes.descr} component="p">
            {tHTML('aeth-promo.text')}
          </Typography>
        </div>
      </Curtains>
    </section>
  );
};
