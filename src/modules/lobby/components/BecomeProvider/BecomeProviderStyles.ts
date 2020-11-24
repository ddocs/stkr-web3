import { makeStyles } from '@material-ui/core/styles';
import * as assetsReference from './assets';
import { getImages } from '../../../../common/utils/getImages';
import { Theme } from '@material-ui/core';

const assets = getImages(assetsReference);

export const useBecomeProviderStyles = makeStyles<
  Theme,
  { icon?: string; delay?: number }
>(theme => ({
  component: {
    backgroundColor: theme.palette.primary.contrastText,
    padding: theme.spacing(20, 0),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(16, 0),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(12, 0),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(8, 0),
    },
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(9, 1fr)',
    gridTemplateRows: 'auto 1fr',
    gridColumnGap: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto auto auto',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateRows: 'auto auto auto auto',
    },
  },
  title: {
    gridColumn: '1/4',
    gridRow: '1/2',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      gridColumn: '-1/1',
      marginBottom: theme.spacing(3),
    },
  },
  textWrapper: {
    gridColumn: '4/10',
    gridRow: '1/2',
    alignSelf: 'end',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '-1/1',
      gridRow: '2/3',
    },
  },
  text: {
    margin: 0,
    fontSize: 24,
    [theme.breakpoints.down('lg')]: {
      fontSize: 18,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  button: {
    '&&': {
      minWidth: 220,
      marginLeft: theme.spacing(9.5),
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },
  mobileButton: {
    '&&': {
      gridRow: '4/5',
      width: '100%',
      margin: 0,
      marginTop: theme.spacing(3.5),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  },
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(9, 1fr)',
    gridGap: theme.spacing(1.5),
    gridColumn: '-1/1',
    gridRow: '2/3',
    margin: 0,
    marginTop: theme.spacing(15),
    padding: 0,
    listStyle: 'none',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      gridColumn: '-1/1',
      gridRow: '3/4',
      marginTop: theme.spacing(7),
    },
  },
  item: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: 'auto auto 1fr',
    gridTemplateAreas: '"icon" "title" "text"',
    padding: theme.spacing(5, 5, 6.5),
    backgroundColor: theme.palette.background.default,
    transitionTimingFunction: 'linear',
    transitionDuration: '350ms',
    transitionProperty: 'opacity, transform',
    transitionDelay: props => (props.delay ? `${props.delay}ms` : '0ms'),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(5, 2.5, 6.5),
    },
    '&:nth-child(1)': {
      gridColumn: '1/4',
      [theme.breakpoints.down('sm')]: {
        gridColumn: '-1/1',
      },
    },
    '&:nth-child(2)': {
      gridColumn: '4/7',
      [theme.breakpoints.down('sm')]: {
        gridColumn: '-1/1',
      },
    },
    '&:nth-child(3)': {
      gridColumn: '7/10',
      [theme.breakpoints.down('sm')]: {
        gridColumn: '-1/1',
      },
    },
    '&::before': {
      position: 'relative',
      content: '""',
      gridArea: 'icon',
      width: 64,
      height: 64,
      marginBottom: theme.spacing(2.5),
      backgroundImage: props =>
        props.icon ? `url(${assets[props.icon.toLowerCase()]})` : undefined,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
    },
  },
  hidden: {
    '&&': {
      opacity: 0,
      transform: 'translateY(20%)',
    },
  },
  itemCaption: {
    gridArea: 'title',
    margin: 0,
    whiteSpace: 'nowrap',
  },
  itemText: {
    gridArea: 'text',
    margin: 0,
    marginTop: theme.spacing(2),
    opacity: 0.5,
  },
}));
