import React from 'react';
import { Range } from './Range';
import { Box } from '@material-ui/core';

const RangeStory = () => {
  return (
    <Box width={500}>
      <Box padding={3}>
        <Range value={100} />
      </Box>
      <Box padding={3}>
        <Range value={50} />
      </Box>
      <Box padding={3}>
        <Range value={25} />
      </Box>
      <Box padding={3}>
        <Range value={0} />
      </Box>
    </Box>
  );
};

export const RangeExample = () => <RangeStory />;

export default {
  title: 'components/Range',
};
