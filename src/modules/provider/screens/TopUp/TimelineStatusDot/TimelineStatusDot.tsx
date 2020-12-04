import React from 'react';
import {
  TimelineDot as MuiTimelineDot,
  TimelineDotProps,
} from '@material-ui/lab';
import { useTimelineStatusDotStyles } from './TimelineStatusDotStyles';

export type TimelineStatus = 'done' | 'current' | 'coming';

interface ITimelineStatusDotProps extends TimelineDotProps {
  status: TimelineStatus;
}

export function TimelineStatusDot({
  status,
  ...rest
}: ITimelineStatusDotProps) {
  const classes = useTimelineStatusDotStyles({ status });
  return <MuiTimelineDot classes={classes} {...rest} />;
}
