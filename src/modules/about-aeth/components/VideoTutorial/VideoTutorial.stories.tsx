/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { VideoTutorial } from './VideoTutorial';

const DefaultStory = () => {
  return <VideoTutorial />;
};

export const Default = () => <DefaultStory />;

export default {
  title: 'modules/AboutAeth/component/VideoTutorial',
};
