import React from 'react';
import { useModerationStatusLedStyles } from './ModerationStatusLedStyles';
import { t } from '../../../../common/utils/intl';
import { WithUseStyles } from '../../../../common/types';
import { ProposalStatus } from "@ankr.com/stkr-jssdk";

export interface IModerationStatusLedProps {
  status: ProposalStatus;
  variant?: 'contained';
}

export const ModerationStatusLed = (
  props: IModerationStatusLedProps &
    Partial<WithUseStyles<typeof useModerationStatusLedStyles>>,
) => {
  const classes = useModerationStatusLedStyles(props);
  const { status } = props;

  return (
    <div className={classes.root}>
      <div className={classes.led} />
      {t(`moderation-status.status.${status}`)}
    </div>
  );
};
