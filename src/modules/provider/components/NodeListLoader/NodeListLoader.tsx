import { Box } from '@material-ui/core';
import React from 'react';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { useNodeListLoader } from './useNodeListLoader';

export const NodeListLoader = () => {
  const { isAllLoaded, isLoading, ref } = useNodeListLoader();

  const renderedLoadMore = <div ref={ref} style={{ height: 1 }} />;

  const renderedLoader = (
    <Box textAlign="center">
      {isLoading ? <QueryLoading /> : renderedLoadMore}
    </Box>
  );

  return isAllLoaded ? null : renderedLoader;
};
