import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core';

export const useTextFieldStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      padding: theme.spacing(1.5, 0),
      boxSizing: 'border-box',

      fontSize: 18,

      borderRadius: 0,
      border: 'none',

      backgroundColor: 'transparent',

      '&$error': {
        borderColor: theme.palette.error.main,
      },
    },

    input: {
      padding: 0,

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

    colorPrimary: {
      color: theme.palette.primary.main,

      borderBottom: `1px solid ${theme.palette.primary.main}`,

      '&:$focused': {},
    },

    colorSecondary: {
      color: theme.palette.text.secondary,

      borderBottom: `1px solid ${theme.palette.text.secondary}`,

      '&:$focused': {},
    },

    focused: {},

    error: {},
  }),
);
