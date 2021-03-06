import { Box, Typography } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_AETH_PATH } from '../../../../common/const';
import { t } from '../../../../common/utils/intl';
import { InView } from '../../../../components/InView';
import { Button } from '../../../../UiKit/Button';
import { Curtains } from '../../../../UiKit/Curtains';
import { useAethBannerStyles } from './AethBannerStyles';
import { ReactComponent as AETHLogoImg } from './assets/aeth-logo.svg';
import { ReactComponent as EthereumLogoImg } from './assets/ethereum-logo.svg';

interface IAethBannerProps {
  className?: string;
}

export const AethBanner = ({ className }: IAethBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const classes = useAethBannerStyles();

  return (
    <InView
      setVisible={setIsVisible}
      className={classNames(classes.root, className)}
      component="section"
      rootMargin="0% 0% -15% 0%"
      once
    >
      <Curtains>
        <Link
          to={ABOUT_AETH_PATH}
          className={classNames(
            classes.box,
            classes.boxWithAnimation,
            isVisible && classes.boxAnimated,
          )}
        >
          <div
            className={classNames(
              classes.logo,
              classes.logoWithAnimation,
              isVisible && classes.logoAnimated,
            )}
          >
            <EthereumLogoImg
              className={classNames(classes.logoIcon, classes.logoIconEtherium)}
            />

            <AETHLogoImg
              className={classNames(classes.logoIcon, classes.logoIconAeth)}
            />
          </div>

          <Box className={classes.content}>
            <Typography
              className={classNames(
                classes.title,
                classes.titleWithAnimation,
                isVisible && classes.titleAnimated,
              )}
              variant="h2"
            >
              {t('aeth-banner.title')}
            </Typography>

            <Typography
              className={classNames(
                classes.text,
                classes.textWithAnimation,
                isVisible && classes.textAnimated,
              )}
              component="p"
            >
              {t('aeth-banner.text')}
            </Typography>
          </Box>

          <div className={classes.linkWrap}>
            <Typography
              className={classNames(
                classes.btnLabel,
                classes.btnLabelWithAnimation,
                isVisible && classes.btnLabelAnimated,
              )}
            >
              {t('aeth-banner.btnText')}
            </Typography>

            <div
              className={classNames(
                classes.btnWrap,
                classes.btnWrapWithAnimation,
                isVisible && classes.btnWrapAnimated,
              )}
            >
              <Button
                className={classes.btnMobile}
                variant="contained"
                color="primary"
                size="large"
                fullWidth={true}
              >
                {t('aeth-banner.btnText')}
              </Button>

              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                size="large"
              >
                <ArrowForward />
              </Button>
            </div>
          </div>
        </Link>
      </Curtains>
    </InView>
  );
};
