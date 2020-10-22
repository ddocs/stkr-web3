import React from 'react';
import { CreateMicropoolComponent } from './CreateMicropool';

const CreateMicropoolStory = () => {
  return <CreateMicropoolComponent onSubmit={() => alert('to next stage')} />;
};

export const CreateMicropoolExample = () => <CreateMicropoolStory />;

export default {
  title: 'modules/provider/component/CreateMicropool',
};
