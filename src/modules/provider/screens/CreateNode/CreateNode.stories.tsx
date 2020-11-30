import React from 'react';
import { CreateNodeComponent } from './CreateNode';

const CreateNodeStory = () => {
  return (
    <CreateNodeComponent
      onSubmit={() => alert('to next stage')}
    />
  );
};

export const CreateNodeExample = () => <CreateNodeStory />;

export default {
  title: 'modules/provider/component/CreateNode',
};
