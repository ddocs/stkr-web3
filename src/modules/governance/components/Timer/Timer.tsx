import React from 'react';
import { useTimerStyles } from './TimerStyles';

interface ITimerProps {}

export const Timer = (props: ITimerProps) => {
  const classes = useTimerStyles({});

  return <div className={classes.root}>2d:14h:36m</div>;
};
