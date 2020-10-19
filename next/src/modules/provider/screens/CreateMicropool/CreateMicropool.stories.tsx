import React from 'react';
import { CreateMicropoolComponent } from './CreateMicropool';

const CreateMicropoolStory = () => {
  return (
    <CreateMicropoolComponent
      onSubmit={() => alert('to next stage')}
      beacons={[{ value: '1', label: 'Alex_Beacon_Node' }]}
    />
  );
};

export const CreateMicropoolExample = () => <CreateMicropoolStory />;

export default {
  title: 'modules/provider/component/CreateMicropool',
};
