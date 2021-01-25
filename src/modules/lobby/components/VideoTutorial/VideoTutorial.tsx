import React from 'react';
import { Video } from '../../../../components/Video';
import { useVideoTutorialStyles } from './VideoTutorialStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { t } from '../../../../common/utils/intl';
import classNames from 'classnames';

export const VideoTutorial = () => {
  const classes = useVideoTutorialStyles();

  return (
    <section className={classes.root}>
      <Curtains className={classNames(classes.container)}>
        <Video
          coverUrl="https://cdn.stkr.io/assets/stkr_presentation.mp4"
          fullUrl="https://www.youtube.com/embed/z5VYqaREVbE?autoplay=1"
          videoTitle={t('video-tutorial.title')}
        />
      </Curtains>
    </section>
  );
};
