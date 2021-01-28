import { Box } from '@material-ui/core';
import React from 'react';
import { Video } from '../../../../components/Video';
import { Curtains } from '../../../../UiKit/Curtains';

export const VideoTutorial = () => {
  return (
    <Box pb={{ xs: 6, md: 12 }} component="section">
      <Curtains>
        <Video
          coverUrl="https://cdn.stkr.io/assets/aeth.mp4"
          fullUrl="https://www.youtube.com/embed/z5VYqaREVbE?autoplay=1"
        />
      </Curtains>
    </Box>
  );
};
