import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const usePoolStyles = makeStyles<Theme>(theme => ({
  component: {},
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    width: '100%',
    margin: 0,
    boxSizing: 'border-box',
  },
  table: {
    position: 'relative',
    width: '100%',
    marginTop: theme.spacing(3),
    '&$disabled::after': {
      pointerEvents: 'none',
      position: 'absolute',
      top: '25%',
      bottom: 0,
      left: 0,
      right: 0,
      content: '""',
      display: 'block',
      backgroundImage:
        'linear-gradient(180deg, #0F0F0F 0%, rgba(15, 15, 15, 0) 0.01%, #0F0F0F 100%)',
    },
  },
  disabled: {},
  note: {
    position: 'relative',
    zIndex: 1,
    alignSelf: 'center',
    margin: 0,
    marginTop: -theme.spacing(2),
    fontSize: 36,
    lineHeight: 1.25,
    fontWeight: 500,
  },
  button: {
    minWidth: 218,
    margin: '0 auto',
    marginTop: theme.spacing(4.5),
  },
}));
