import React from 'react';
import { NodeListComponent } from './NodeList';
import { NODES_DATA } from './mock';
import { mapSidecar } from '../../../../store/apiMappers/sidecarsApi';

const NodeListStory = () => {
  return <NodeListComponent data={NODES_DATA.map(mapSidecar)} />;
};

export const NodeListExample = () => <NodeListStory />;

export default {
  title: 'modules/provider/component/NodeList',
};
