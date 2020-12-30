import { fade, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import {
  IModerationStatusLedProps,
  ModerationStatus,
} from './ModerationStatusLed';

export const useModerationStatusLedStyles = makeStyles<
  Theme,
  IModerationStatusLedProps
>(theme => {
  function getColor(status: ModerationStatus) {
    return status === 'moderation'
      ? fade(theme.palette.common.white, 0.6)
      : theme.palette.primary.main;
  }

  return {
    root: ({ status, variant }) => {
      return {
        color: getColor(status),
        display: 'flex',
        alignItems: 'center',
        ...(variant === 'contained'
          ? {
              background: fade(getColor(status), 0.1),
              borderRadius: 26,
              padding: '4px 14px',
              fontSize: 16,
              fontWeight: 500,
            }
          : {}),
      };
    },
    led: ({ status, variant }) => {
      return {
        width: 8,
        height: 8,
        borderRadius: '50%',
        marginRight: theme.spacing(1),
        background: getColor(status),
        ...(variant === 'contained'
          ? {
              marginRight: theme.spacing(1.5),
            }
          : {}),
      };
    },
  };
});
