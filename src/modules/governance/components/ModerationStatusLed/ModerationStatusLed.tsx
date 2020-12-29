import React from 'react';
import { useModerationStatusLedStyles } from './ModerationStatusLedStyles';
import { t } from '../../../../common/utils/intl';

export type ModerationStatus = 'moderation' | 'live';

export interface IModerationStatusProps {
  status: ModerationStatus;
}

export const ModerationStatusLed = (props: IModerationStatusProps) => {
  const classes = useModerationStatusLedStyles(props);
  const { status } = props;

  return (
    <div className={classes.root}>
      <div className={classes.led} />
      {t(`moderation-status.status.${status}`)}
    </div>
  );
};
