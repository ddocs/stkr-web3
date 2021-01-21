import React from 'react';
import { Video } from './Video';

const DefaultStory = () => {
  return (
    <Video
      coverUrl="https://cdn.stkr.io/assets/stkr_presentation.mp4"
      fullUrl="https://www.youtube.com/embed/z5VYqaREVbE?autoplay=1"
      videoTitle="Some title"
    />
  );
};

export const Default = () => <DefaultStory />;

export default {
  title: 'components/Video',
};
