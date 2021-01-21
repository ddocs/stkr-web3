import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useRewardsImgStyles } from './RewardsImgStyles';
import { ReactComponent as CylinderImg } from './assets/cylinder.svg';
import { Typography } from '@material-ui/core';
import { t } from '../../../../common/utils/intl';
import { useIntersectionObserver } from '../../../../common/hooks/useIntersectionObserver';

interface IRewardsImgProps {
  className?: string;
}

export const RewardsImg = ({ className }: IRewardsImgProps) => {
  const classes = useRewardsImgStyles();
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(
    (isVisible: boolean) => {
      setIsVisible(isVisible);
    },
    imgRef,
    {
      rootMargin: '0% 0% -50% 0%',
    },
  );

  return (
    <div className={classNames(classes.root, className)} ref={imgRef}>
      <CylinderImg className={classes.cylinderImg} />
      <i
        className={classNames(
          classes.gainFiller,
          classes.gainFillerWithAnimations,
          isVisible && classes.gainFillerAnimated,
        )}
      />
      <i
        className={classNames(
          classes.gainFillerTop,
          classes.gainFillerTopWithAnimations,
          isVisible && classes.gainFillerTopAnimated,
        )}
      />
      <i className={classes.gainTopImg} />

      <div
        className={classNames(
          classes.text,
          classes.textRewards,
          classes.textRewardsWithAnimation,
          isVisible && classes.textRewardsAnimated,
        )}
      >
        <Typography className={classes.textElement} component="p">
          {t('aeth-reward.rewards')}
        </Typography>
      </div>

      <div className={classNames(classes.text, classes.textStaked)}>
        <Typography className={classes.textElement} component="p">
          {t('aeth-reward.staked')}
        </Typography>
      </div>

      <div
        className={classNames(
          classes.aeth,
          classes.aethWithAnimations,
          isVisible && classes.aethAnimated,
        )}
      >
        <Typography className={classes.aethText} component="p">
          {t('unit.aeth')}
        </Typography>
      </div>
    </div>
  );
};
