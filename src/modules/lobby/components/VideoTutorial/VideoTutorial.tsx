import React from 'react';
import { useVideoTutorial } from './VideoTutorialStyles';
import { Curtains } from '../../../../UiKit/Curtains';

export const VideoTutorial = () => {
  const classes = useVideoTutorial();
  console.log('classes', classes);

  return (
    <section>
      <Curtains>VideoTutorial</Curtains>
    </section>
  );
};
