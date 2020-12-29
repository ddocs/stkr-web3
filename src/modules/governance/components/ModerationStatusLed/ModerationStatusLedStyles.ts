import { fade, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import {
  IModerationStatusProps,
  ModerationStatus,
} from './ModerationStatusLed';

export const useModerationStatusLedStyles = makeStyles<
  Theme,
  IModerationStatusProps
>(theme => {
  function getColor(status: ModerationStatus) {
    return status === 'moderation'
      ? fade(theme.palette.common.white, 0.6)
      : theme.palette.primary.main;
  }

  return {
    root: {
      color: ({ status }) => getColor(status),
      display: 'flex',
      alignItems: 'center',
    },
    led: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      marginRight: theme.spacing(1),
      background: ({ status }) => getColor(status),
    },
  };
});
