import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DEFAULT_FONT, selection } from '../../../../common/themes/mainTheme';

export const usePromoStyles = makeStyles<Theme, { count: number }>(theme => ({
  component: {},

  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 450px',
    gridTemplateAreas: '"title text" "list list" "what-is what-is"',
    gridRowGap: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      gridTemplateAreas: '"title" "text" "list" "what-is"',
      gridRowGap: theme.spacing(1),
    },
  },

  title: {
    margin: 0,

    fontSize: 120,
    lineHeight: 1,
    fontWeight: 500,

    [theme.breakpoints.down('md')]: {
      fontSize: 90,
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: 70,
      lineHeight: 1.2,
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 53,
    },

    '& span': {
      display: 'flex',
      flexDirection: 'column',
    },

    '& span span': {
      color: theme.palette.primary.main,
    },
  },

  text: {
    alignSelf: 'flex-end',

    maxWidth: 379,
    margin: 0,

    [theme.breakpoints.down('sm')]: {
      maxWidth: 'none',
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },

  info: {
    gridArea: 'list',

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
    },

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },

  whatIs: {
    gridArea: 'what-is',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: 'auto auto',
    gridRowGap: theme.spacing(5),
    gridColumnGap: theme.spacing(4),

    padding: theme.spacing(7.5, 0),

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto auto auto',
      gridRowGap: theme.spacing(4),
      gridColumnGap: 0,

      padding: theme.spacing(4),
    },
  },

  caption: {
    gridColumn: '1/2',
    gridRow: '-1/1',

    padding: theme.spacing(0, 4.5),

    '& span span': {
      color: theme.palette.primary.main,
    },

    [theme.breakpoints.down('sm')]: {
      gridColumn: 'auto',
      gridRow: 'auto',

      padding: 0,

      '& br': {
        display: 'none',
      },
    },
  },

  note: {
    gridColumn: '2/4',

    padding: theme.spacing(0, 4.5),

    [theme.breakpoints.down('sm')]: {
      gridColumn: 'auto',

      padding: 0,
    },

    [theme.breakpoints.down('xs')]: {
      '&&': {
        fontSize: 16,
      },
    },
  },
}));
