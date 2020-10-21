import React from 'react';
import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const WIDTH = 430;
const SLIDER_WIDTH = 135;

const useStyles = makeStyles<Theme>(theme => ({
  component: {
    fill: fade('#c4c4c4', 0.1),

    '& #indeterminate': {
      animation: '$animation 10s ease-in-out infinite',
    },
  },

  '@keyframes animation': {
    '0%': {
      transform: `translateX(0px)`,
    },
    '50%': {
      transform: `translateX(${WIDTH - SLIDER_WIDTH}px)`,
    },
    '100%': {
      transform: `translateX(0px)`,
    },
  },
}));

interface IProgressBarProps {
  progress?: number; // 0-1
  className: string;
}

export const ProgressBar = ({ className, progress = 0 }: IProgressBarProps) => {
  const classes = useStyles();
  return (
    <svg
      width={WIDTH}
      height="5"
      viewBox={`0 0 ${WIDTH} 5`}
      className={classNames(classes.component, className)}
    >
      <rect width={WIDTH} height="5" rx="2" />
      <g>
        <rect
          id="indeterminate"
          x="0"
          y="0"
          width={SLIDER_WIDTH}
          height="5"
          rx="2"
          fill="#FFE819"
        />
      </g>
    </svg>
  );
};
