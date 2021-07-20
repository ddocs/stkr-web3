import * as React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';

import { useInfoLineStyles } from './InfoLineStyles';
import { QuestionIcon } from '../../../../../../UiKit/Icons/QuestionIcon';

interface InfoLineProps {
  title: string;
  value: string | number;
}
export const InfoLine = ({ title, value }: InfoLineProps) => {
  const classes = useInfoLineStyles();

  return (
    <div className={classes.line}>
      <div className={classes.infoText}>
        <span>{title}</span>
        <Tooltip title="Tooltip">
          <IconButton className={classes.question}>
            <QuestionIcon size="xs" />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.infoValue}>{value}</div>
    </div>
  );
};
