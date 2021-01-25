import React, { useState } from 'react';
import classNames from 'classnames';
import { useAdvantagesStyles } from './AdvantagesStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { Typography } from '@material-ui/core';
import { t, tHTML } from '../../../../common/utils/intl';
import { AdvantagesImg } from '../AdvantagesImg';
import { InView } from '../../../../components/InView';

export const Advantages = () => {
  const classes = useAdvantagesStyles();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className={classes.root}>
      <Curtains classes={{ root: classes.wrapper }}>
        <AdvantagesImg className={classes.imgContainer} />

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
            {tHTML('aeth-advantages.title')}
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
            {t('aeth-advantages.primary-text')}
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
            {t('aeth-advantages.secondary-text')}
          </Typography>
        </InView>
      </Curtains>
    </section>
  );
};
