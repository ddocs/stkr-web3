import { Box, BoxProps } from '@material-ui/core';
import React from 'react';
import { t } from '../../common/utils/intl';
import { useTimer } from '../../modules/governance/hooks/useTimer';

interface ITimerProps extends BoxProps {
  endTime: Date;
}

export const Timer = ({ endTime, ...restProps }: ITimerProps) => {
  const { duration, isTimeOver } = useTimer(endTime);

  return (
    <Box {...restProps}>{isTimeOver ? t('time.time-is-up') : duration}</Box>
  );
};
