import React from 'react';
import { useModerationStatusStyles } from './ModerationStatusStyles';
import { t } from '../../../../common/utils/intl';

export type ModerationStatus = 'moderation' | 'live';

export interface IModerationStatusProps {
  status: ModerationStatus;
}

export const ModerationStatus = (props: IModerationStatusProps) => {
  const classes = useModerationStatusStyles(props);
  const { status } = props;

  return (
    <div className={classes.root}>
      <div className={classes.led} />
      {t(`moderation-status.status.${status}`)}
    </div>
  );
};
