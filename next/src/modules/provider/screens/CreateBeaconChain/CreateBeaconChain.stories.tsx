import React from 'react';
import { CreateBeaconChainComponent } from './CreateBeaconChain';

const CreateBeaconChainStory = () => {
  return <CreateBeaconChainComponent onSubmit={() => alert('to next stage')} />;
};

export const CreateBeaconChainExample = () => <CreateBeaconChainStory />;

export default {
  title: 'modules/provider/component/CreateBeaconChainComponent',
};
