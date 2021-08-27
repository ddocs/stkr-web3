import { Box, BoxProps } from '@material-ui/core';
import React from 'react';
import { t } from '../../common/utils/intl';
import { useTimer } from '../../modules/governance/hooks/useTimer';

interface ITimerProps extends BoxProps {
  endTime: Date;
  timeIsUpText?: string;
}

export const Timer = ({
  endTime,
  timeIsUpText = t('time.time-is-up'),
  ...restProps
}: ITimerProps) => {
  const { duration, isTimeOver } = useTimer(endTime);

  return <Box {...restProps}>{isTimeOver ? timeIsUpText : duration}</Box>;
};
