import React, { useState } from 'react';
import classNames from 'classnames';
import { Curtains } from '../../../../UiKit/Curtains';
import { RewardsImg } from '../RewardsImg';
import { useRewardsStyles } from './RewardsStyles';
import { tHTML, t } from '../../../../common/utils/intl';
import { Typography } from '@material-ui/core';
import { InView } from '../../../../components/InView';

export const Rewards = () => {
  const classes = useRewardsStyles();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className={classes.root}>
      <Curtains classes={{ root: classes.wrapper }}>
        <RewardsImg className={classes.imgContainer} />

        <InView
          className={classes.content}
          setVisible={setIsVisible}
          once
          rootMargin="0% 0% -30% 0%"
        >
          <Typography
            className={classNames(
              classes.title,
              classes.titleWithAnimations,
              isVisible && classes.fadeInUp,
            )}
            variant="h1"
            component="h2"
          >
            {tHTML('aeth-reward.title')}
          </Typography>

          <Typography
            className={classNames(
              classes.text,
              classes.textBolder,
              classes.textWithAnimations,
              isVisible && classes.fadeInUp,
            )}
            component="p"
          >
            {t('aeth-reward.primary-text')}
          </Typography>

          <Typography
            className={classNames(
              classes.text,
              classes.textWithAnimations,
              isVisible && classes.fadeInUp,
            )}
            component="p"
            color="textSecondary"
          >
            {t('aeth-reward.secondary-text')}
          </Typography>
        </InView>
      </Curtains>
    </section>
  );
};
