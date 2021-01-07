import React from 'react';
import { useTimerStyles } from './TimerStyles';
import { convertToDuration } from '../../../../common/utils/convertToDuration';

interface ITimerProps {
  startTime: Date;
  endTime: Date;
}

export const Timer = ({ startTime, endTime }: ITimerProps) => {
  const classes = useTimerStyles({});

  return (
    <div className={classes.root}>{convertToDuration(startTime, endTime)}</div>
  );
};
