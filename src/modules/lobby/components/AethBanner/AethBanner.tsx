import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAethBannerStyles } from './AethBannerStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { Button } from '../../../../UiKit/Button';
import { Typography } from '@material-ui/core';
import { ABOUT_AETH_PATH } from '../../../../common/const';
import { ArrowForward } from '@material-ui/icons';
import { t } from '../../../../common/utils/intl';

interface IAethBannerProps {
  className?: string;
}

export const AethBanner = ({ className }: IAethBannerProps) => {
  const classes = useAethBannerStyles();

  return (
    <section className={classNames(classes.root, className)}>
      <Curtains>
        <Link to={ABOUT_AETH_PATH} className={classes.box}>
          <Typography className={classes.title} variant="h2">
            {t('aeth-banner.title')}
          </Typography>

          <Typography className={classes.text} component="p">
            {t('aeth-banner.text')}
          </Typography>

          <div className={classes.linkWrap}>
            <Button
              className={classes.btnMobile}
              variant="contained"
              color="primary"
              size="large"
              fullWidth={true}
            >
              {t('aeth-banner.btnText')}
            </Button>

            <Typography className={classes.btnLabel}>
              {t('aeth-banner.btnText')}
            </Typography>

            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              size="large"
            >
              <ArrowForward />
            </Button>
          </div>
        </Link>
      </Curtains>
    </section>
  );
};
