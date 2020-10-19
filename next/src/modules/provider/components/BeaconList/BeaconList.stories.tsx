import React from 'react';
import { BeaconListComponent } from './BeaconList';
import { BEACON_NODE_DATA } from './mock';
import { mapSidecar } from '../../../../store/apiMappers/sidecarsAPI';

const BeaconListStory = () => {
  return <BeaconListComponent data={BEACON_NODE_DATA.map(mapSidecar)} />;
};

export const BeaconListExample = () => <BeaconListStory />;

export default {
  title: 'modules/provider/component/BeaconList',
};
