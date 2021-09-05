import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStakeAvaxStyles = makeStyles<Theme>(theme => {
  return {
    root: {
      flexGrow: 1,
      display: 'grid',
      gridTemplateColumns: '100%',
      gridTemplateRows: '100%',
      padding: theme.spacing(5, 0),
      boxSizing: 'border-box',

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(8, 0, 5),
      },
    },

    container: {
      '&&': {
        [theme.breakpoints.down('xs')]: {
          padding: theme.spacing(0, 2),
        },
      },
    },

    box: {
      position: 'relative',
      padding: 0,
      maxWidth: 1132,
      margin: '0 auto',

      [theme.breakpoints.up('lg')]: {
        borderRadius: 65,
      },
    },

    body: {
      padding: theme.spacing(3, 0, 4),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6, 0, 8),
      },
    },

    wrapper: {
      padding: theme.spacing(0, 2.5),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0, 5),
        maxWidth: 880,
        margin: '0 auto',
      },
    },

    footer: {
      borderTop: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
      padding: theme.spacing(3.5, 0, 5),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6, 0),
      },
    },

    footerWrapper: {
      display: 'grid',
      gridRowGap: theme.spacing(3),

      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr minmax(auto, 214px)',
        gridColumnGap: theme.spacing(4),
      },
    },

    title: {
      textAlign: 'left',
      margin: theme.spacing(0, 0, 5.5),

      [theme.breakpoints.down('xs')]: {
        fontSize: 24,
      },

      [theme.breakpoints.up('sm')]: {
        textAlign: 'center',
        marginBottom: theme.spacing(10),
      },
    },

    info: {
      alignSelf: 'start',
      paddingLeft: theme.spacing(2.5),
      borderLeft: `2px solid ${theme.palette.primary.main}`,

      [theme.breakpoints.down('xs')]: {
        fontSize: 14,
      },
    },
  };
});
