import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core';

export const useInputFieldStyles = makeStyles((theme: Theme) =>
  createStyles({
    component: {
      position: 'relative',

      display: 'grid',
      gridTemplateRows: '100%',
      gridTemplateColumns: '100%',
    },

    input: {
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'center',

      '& .MuiInput-root': {
        marginTop: 0,
        padding: theme.spacing(2, 0),

        color: theme.palette.text.primary,

        borderBottomWidth: 2,
        borderBottomStyle: 'solid',

        transitionTimingFunction: 'linear',
        transitionDuration: '250ms',
        transitionProperty: 'border-color, color',
      },

      '& .MuiInput-root.Mui-focused': {
        borderColor: theme.palette.primary.main,
      },

      '& input': {
        height: '100%',
        padding: 0,

        boxSizing: 'border-box',

        fontSize: 18,
        lineHeight: 1.2,
        color: 'inherit',

        '&:-webkit-autofill': {
          color: 'inherit',

          backgroundColor: 'transparent',

          '&, &:hover, &:focus, &:active': {
            transitionDelay: '9999s',
            transitionProperty: 'background-color, color',
          },
        },

        '&:-moz-ui-invalid': {
          boxShadow: 'none',
        },
      },

      '& input:read-only': {
        '&::after, &::before': {
          display: 'none',
        },
      },
    },

    inputPrimary: {
      '& .MuiInput-root': {
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },

    inputSecondary: {
      '& .MuiInput-root': {
        color: theme.palette.text.secondary,
        borderColor: theme.palette.text.secondary,
      },
    },

    inputDisabled: {
      '& .MuiInput-root': {
        color: theme.palette.text.secondary,
        borderColor: theme.palette.text.secondary,
        pointerEvents: 'none',
      },
    },

    wrapper: {
      position: 'relative',
    },

    message: {
      position: 'absolute',
      top: theme.spacing(0.75),

      color: theme.palette.error.main,
      fontSize: 12,
    },
  }),
);
