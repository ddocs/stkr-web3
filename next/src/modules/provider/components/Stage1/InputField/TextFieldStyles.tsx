import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core';

export const useTextFieldStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      padding: theme.spacing(1.5, 0),
      boxSizing: 'border-box',

      fontSize: 18,
      color: theme.palette.primary.main,

      borderRadius: 0,
      border: 'none',
      borderBottom: `1px solid ${theme.palette.primary.main}`,

      backgroundColor: 'transparent',

      '&:hover': {
        borderColor: theme.palette.primary.main,
      },

      '&$focused': {
        borderColor: theme.palette.primary.main,
      },

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

    focused: {},

    error: {},
  }),
);
