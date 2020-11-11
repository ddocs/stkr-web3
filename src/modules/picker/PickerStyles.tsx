import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as assetsReference from './assets';
import { getImages } from '../../common/utils/getImages';
import icon from './raw_assets/check.svg';

const assets = getImages(assetsReference);

export const usePickerStyles = makeStyles<Theme, { icon?: string }>(theme => ({
  component: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateRows: '100%',
    gridTemplateColumns: '100%',
    padding: theme.spacing(7.5, 0, 4.5),
    boxSizing: 'border-box',
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(4, 0, 1),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 0),
    },
  },
  wrapper: {
    display: 'grid',
    gridTemplateRows: '100%',
    gridTemplateColumns: '100%',
  },
  list: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '100%',
    width: '100%',
    maxWidth: 1170,
    maxHeight: 650,
    height: '100%',
    margin: 'auto',
    padding: 0,
    listStyle: 'none',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 670,
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto auto',
      height: 'auto',
      maxHeight: 'none',
    },
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(5.25, 11.25),
    boxSizing: 'border-box',
    border: `1px solid #3F3F3F`,
    transitionTimingFunction: 'linear',
    transitionDuration: '300ms',
    transitionProperty: 'background-color',
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(5.25, 8),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(5.25, 5.5),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5.25, 3.5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 3),
    },
    '&::before': {
      position: 'relative',
      content: '""',
      display: 'block',
      width: 165,
      height: 165,
      marginBottom: theme.spacing(3),
      backgroundImage: props =>
        props.icon ? `url(${assets[props.icon.toLowerCase()]})` : undefined,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      [theme.breakpoints.down('md')]: {
        width: 135,
        height: 135,
      },
      [theme.breakpoints.down('xs')]: {
        width: 95,
        height: 95,
      },
    },
    '&:first-child': {
      [theme.breakpoints.up('sm')]: {
        borderRight: 0,
      },
      [theme.breakpoints.down('xs')]: {
        borderBottom: 0,
      },
    },
    '&:hover': {
      backgroundColor: '#161616',
    },
  },
  caption: {
    flexShrink: 0,
    margin: 0,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: 18,
    },
  },
  subList: {
    margin: 0,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    padding: 0,
    listStyle: 'none',
    [theme.breakpoints.down('lg')]: {
      marginTop: theme.spacing(6),
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  subItem: {
    '&&': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: theme.spacing(2),
      [theme.breakpoints.down('lg')]: {
        fontSize: 14,
      },
      '&:first-child': {
        marginTop: 0,
      },
      '&::before': {
        position: 'relative',
        content: '""',
        flexShrink: 0,
        display: 'block',
        width: 18,
        height: 18,
        marginTop: 4,
        marginRight: theme.spacing(2),
        backgroundImage: `url("${icon}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
    },
  },
  link: {
    width: '100%',
    marginTop: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
    },
  },
}));
