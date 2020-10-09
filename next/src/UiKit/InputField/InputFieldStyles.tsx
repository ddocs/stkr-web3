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

      padding: theme.spacing(1, 0),

      color: theme.palette.text.primary,

      borderBottom: `2px solid ${theme.palette.text.primary}`,

      '& .MuiInput-root': {
        marginTop: 0,
      },

      '& label': {
        top: '50%',

        color: 'inherit',

        transform: 'translateY(-45%) scale(1)',

        transitionProperty: 'top, transform, color',
      },

      '& label.MuiInputLabel-shrink': {
        top: 0,
        transform: 'translateY(0) scale(0.65)',
      },

      '& label.Mui-focused': {
        color: 'inherit',
      },

      '& input': {
        height: '100%',
        padding: 0,
        paddingTop: theme.spacing(1),

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
    },

    inputPrimary: {
      color: theme.palette.primary.main,

      borderColor: theme.palette.primary.main,
    },

    inputSecondary: {
      color: theme.palette.text.secondary,

      borderColor: theme.palette.text.secondary,
    },

    inputDisabled: {
      color: theme.palette.text.secondary,

      borderColor: theme.palette.text.secondary,

      pointerEvents: 'none',
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
