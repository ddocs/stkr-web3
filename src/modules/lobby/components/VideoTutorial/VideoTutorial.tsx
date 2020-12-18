import React, { useCallback } from 'react';
import { useVideoTutorial } from './VideoTutorialStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import ReactPlayer from 'react-player';
import { ReactComponent as PlayIcon } from './assets/play.svg';

const URL = 'https://cdn.stkr.io/assets/stkr_presentation.mp4';

export const VideoTutorial = () => {
  const classes = useVideoTutorial();
  console.log('classes', classes);

  const handlePlay = useCallback(() => {
    console.log('handlePlay');
  }, []);

  return (
    <section>
      <Curtains className={classes.root}>
        <div onClick={handlePlay}>
          <ReactPlayer
            url={URL}
            controls={false}
            playing={true}
            muted={true}
            volume={0.7}
            loop={true}
            width="100%"
            height={740}
            config={{
              youtube: {
                playerVars: {
                  controls: 0,
                  iv_load_policy: 3,
                  modestbranding: 1,
                  disablekb: 1,
                },
              },
            }}
            onPlay={handlePlay}
          />
          <PlayIcon className={classes.play} />
        </div>
      </Curtains>
    </section>
  );
};
