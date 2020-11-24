import React from 'react';
import { TopUpComponent } from './TopUp';

const TopUpStory = () => {
  return <TopUpComponent onSubmit={() => alert('to next stage')} />;
};

export const TopUpExample = () => <TopUpStory />;

export default {
  title: 'modules/provider/component/TopUp',
};
