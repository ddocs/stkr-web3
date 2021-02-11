import React from 'react';
import { ScrollLoader } from '../../../../components/ScrollLoader';
import { useNodeListLoader } from './useNodeListLoader';

export const NodeListLoader = () => {
  const { isAllLoaded, isLoading, loadSidecars } = useNodeListLoader();
  return (
    <ScrollLoader
      isLoading={isLoading}
      onLoadMore={loadSidecars}
      disabled={isAllLoaded}
    />
  );
};
