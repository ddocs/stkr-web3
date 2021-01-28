import React from 'react';
import { Video } from '../../../../components/Video';
import { Curtains } from '../../../../UiKit/Curtains';

export const VideoTutorial = () => {
  return (
    <section>
      <Curtains>
        <Video
          coverUrl="https://cdn.stkr.io/assets/aeth.mp4"
          fullUrl="https://www.youtube.com/embed/z5VYqaREVbE?autoplay=1"
        />
      </Curtains>
    </section>
  );
};
