import React from 'react';

import { useStyles } from './Styles';

interface ProgressLineProps {
  value: number;
  max: number;
}

const ProgressLine = ({ value, max }: ProgressLineProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div
        className={classes.line}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
};

export default ProgressLine;
