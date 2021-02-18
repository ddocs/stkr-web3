import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getImages } from '../../common/utils/getImages';
import * as assetsReference from './assets';
import icon from './assets/check.svg';

const assets = getImages(assetsReference);

export const usePickerStyles = makeStyles<Theme, { icon?: string }>(theme => ({
  component: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateRows: '100%',
    gridTemplateColumns: '100%',
    padding: theme.spacing(4.5, 0),
    boxSizing: 'border-box',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4.5, 0, 2),
    },

    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(7.5, 0, 4.5),
    },
  },
  wrapper: {
    display: 'grid',
    gridTemplateRows: '100%',
    gridTemplateColumns: '100%',
  },

  list: {
    display: 'grid',
    width: '100%',
    maxWidth: 1170,
    margin: 'auto',
    padding: 0,
    listStyle: 'none',
    gap: theme.spacing(2, 0),

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
      gap: '0',
    },
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(3, 2.5, 2.5),
    boxSizing: 'border-box',
    border: `1px solid #3F3F3F`,
    transitionTimingFunction: 'linear',
    transitionDuration: '300ms',
    transitionProperty: 'background-color',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5.25, 3.5),
    },

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5.25, 5.5),
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(5.25, 8),
    },

    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(7.5, 11.25),
    },

    '&::before': {
      flexShrink: 0,
      position: 'relative',
      content: '""',
      display: 'block',
      width: '1em',
      height: '1em',
      fontSize: 135,
      marginBottom: theme.spacing(2),
      backgroundImage: props =>
        props.icon ? `url(${assets[props.icon.toLowerCase()]})` : undefined,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',

      [theme.breakpoints.up('md')]: {
        fontSize: 145,
        marginBottom: theme.spacing(5),
      },
    },

    '&:first-child': {
      [theme.breakpoints.up('sm')]: {
        borderRight: 0,
        borderRadius: '64px 0 0 64px',
      },
    },

    '&:last-child': {
      [theme.breakpoints.up('sm')]: {
        borderRadius: '0 64px 64px 0',
      },
    },

    '&:hover': {
      backgroundColor: '#161616',
    },
  },

  caption: {
    textAlign: 'center',

    [theme.breakpoints.down('xs')]: {
      fontSize: 18,
    },

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 4),
    },
  },

  subList: {
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
      margin: 0,
      marginBottom: theme.spacing(4),
      padding: 0,
      listStyle: 'none',
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
    marginTop: theme.spacing(3),

    [theme.breakpoints.up('sm')]: {
      marginTop: 'auto',
    },
  },
}));
