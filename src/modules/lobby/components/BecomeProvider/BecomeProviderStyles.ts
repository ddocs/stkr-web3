import { Theme } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Seconds } from '../../../../common/types';
import { getImages } from '../../../../common/utils/getImages';
import * as assetsReference from './assets';

const assets = getImages(assetsReference);

export const useBecomeProviderStyles = makeStyles<
  Theme,
  { icon?: string; delay?: Seconds }
>(theme => ({
  root: {
    backgroundColor: theme.palette.common.black,
    padding: theme.spacing(8, 0),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12, 0),
    },

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(16, 0),
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(20, 0),
    },
  },

  wrapper: {
    display: 'grid',

    [theme.breakpoints.up('md')]: {
      gridColumnGap: theme.spacing(0.5),
      gridTemplateColumns: 'repeat(9, 1fr)',
      gridTemplateRows: 'auto 1fr',
    },
  },

  title: {
    marginBottom: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      gridColumn: '1/4',
      margin: theme.spacing(-1, 0, 0),
    },
  },

  textWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',

    [theme.breakpoints.up('md')]: {
      gridColumn: '4/10',
    },
  },

  text: {
    margin: 0,

    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
    },

    [theme.breakpoints.up('xl')]: {
      fontSize: 24,
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
    marginTop: theme.spacing(3.5),

    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  list: {
    display: 'grid',
    gridGap: theme.spacing(0.5),
    margin: theme.spacing(7, 0, 0),
    padding: 0,
    listStyle: 'none',

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridColumn: '-1/1',
      marginTop: theme.spacing(15),
    },
  },

  item: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: 'auto auto 1fr',
    gridTemplateAreas: '"icon" "title" "text"',

    padding: theme.spacing(5, 2.5, 6.5),
    backgroundColor: theme.palette.background.default,

    transition: 'opacity 0.4s, transform 0.4s, background 0.2s',
    transitionDelay: props =>
      props.delay ? `${props.delay}s, ${props.delay}s, 0s` : '0s',

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(5, 5, 6.5),
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

    '&:hover': {
      backgroundColor: lighten(theme.palette.background.default, 0.02),
    },
  },

  hidden: {
    '&&': {
      opacity: 0,
      transform: 'translateY(10px)',
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
