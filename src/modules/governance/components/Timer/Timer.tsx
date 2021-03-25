import { Box, BoxProps } from '@material-ui/core';
import React, { useState } from 'react';
import { convertToDuration } from '../../../../common/utils/convertToDuration';
import { useInterval } from '../../../../common/utils/useInterval';

const ONE_SECOND = 1000;

interface ITimerProps extends BoxProps {
  endTime: Date;
}

export const Timer = ({ endTime, ...restProps }: ITimerProps) => {
  const [duration, setDuration] = useState(
    convertToDuration(new Date(), endTime),
  );

  useInterval(() => {
    setDuration(convertToDuration(new Date(), endTime));
  }, ONE_SECOND);

  return <Box {...restProps}>{duration}</Box>;
};
