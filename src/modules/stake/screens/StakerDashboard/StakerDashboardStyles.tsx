import { makeStyles, Theme, fade } from '@material-ui/core/styles';

export const useStakerDasboardStyles = makeStyles<Theme>(theme => ({
  component: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto auto 1fr',
    },
  },
  content: {
    position: 'relative',
    gridColumn: '1/2',
    display: 'grid',
    gridTemplateColumns: '1fr minmax(0, 138px)',
    gridTemplateRows: '48px auto 1fr',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(2),
    alignItems: 'flex-start',
    width: '100%',
    padding: theme.spacing(10, 7.5, 5, 0),
    boxSizing: 'border-box',
    borderRight: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(10, 7.5, 7, 0),
    },
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(5, 3.5, 3, 0),
    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: '-1/1',
      gridTemplateColumns: '1fr minmax(0, 98px)',
      gridTemplateRows: 'auto',
      gridRowGap: theme.spacing(3.5),
      padding: theme.spacing(5, 0),
      borderRight: 0,
    },
    [theme.breakpoints.down('xs')]: {
      gridRowGap: theme.spacing(2.5),
    },
    '&:first-of-type::before': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      content: '""',
      display: 'block',
      width: '50vw',
      height: 1,
      backgroundColor: fade(theme.palette.text.primary, 0.1),
      [theme.breakpoints.down('sm')]: {
        right: -theme.spacing(0, 3),
        width: '100vw',
      },
    },
  },
  balance: {
    gridColumn: '1/2',
    gridRow: '1/3',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: 20,
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      gridRow: '1/2',
    },
  },
  value: {
    display: 'inline-block',
    marginTop: theme.spacing(4),
    fontSize: 98,
    lineHeight: 1.2,
    [theme.breakpoints.down('lg')]: {
      fontSize: 84,
    },
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(2.5),
      fontSize: 68,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2.5),
      fontSize: 38,
    },
    '& > span > span': {
      fontSize: 44,
      [theme.breakpoints.down('md')]: {
        fontSize: 38,
      },
    },
  },
  action: {
    gridColumn: '2/3',
    gridRow: '2/3',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '2/3',
      gridRow: '1/2',
      minHeight: 32,
    },
  },
  primaryAction: {
    gridColumn: '2/3',
    gridRow: '1/2',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '-1/1',
      gridRow: 'auto',
      minHeight: 44,
    },
  },
  note: {
    position: 'relative',
    gridColumn: '-1/1',
    gridRow: '3/4',
    alignSelf: 'flex-end',
    paddingLeft: theme.spacing(1.5),
    lineHeight: 1.6,
    [theme.breakpoints.down('sm')]: {
      gridRow: '2/3',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
    '&::before': {
      position: 'absolute',
      top: theme.spacing(1),
      bottom: theme.spacing(1),
      left: 0,
      content: '""',
      display: 'block',
      width: 2,
      borderRadius: 5,
      backgroundColor: theme.palette.primary.main,
    },
  },
  history: {
    gridColumn: '2/3',
    gridRow: '-1/1',
    maxHeight: 'calc(100vh - 81px)',
    padding: theme.spacing(10, 0, 3, 7.5),
    overflowX: 'auto',
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(5, 0, 3, 3.5),
    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: '-1/1',
      gridRow: 'auto',
      maxHeight: 'none',
      padding: theme.spacing(5, 0),
    },
  },
  table: {
    '&&': {
      minWidth: 'unset',
    },
  },
}));
