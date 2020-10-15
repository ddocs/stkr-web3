import React from 'react';
import { Calculate } from './Calculate';

const CalculateStory = () => {
  return <Calculate isAuthenticated={true} />;
};

export const CalculateExample = () => <CalculateStory />;

export default {
  title: 'modules/Lobby/component/Calculate',
};
