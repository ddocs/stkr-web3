import { Typography } from '@material-ui/core';
import React from 'react';
import { t, tHTML } from '../../../../common/utils/intl';
import { useTimer } from '../../hooks/useTimer';
import { useProjectTimerStyles } from './useProjectTimerStyles';

interface IProjectTimerProps {
  endDate: Date;
  className?: string;
}

export const ProjectTimer = ({ endDate, className }: IProjectTimerProps) => {
  const classes = useProjectTimerStyles();
  const { isTimeOver, duration } = useTimer(endDate);

  return (
    <Typography variant="body2" color="textSecondary" className={className}>
      {isTimeOver ? (
        t('time.time-is-up')
      ) : (
        <>
          <span className={classes.bold}>{tHTML('project.time-left')}</span>{' '}
          <span>{duration}</span>
        </>
      )}
    </Typography>
  );
};
