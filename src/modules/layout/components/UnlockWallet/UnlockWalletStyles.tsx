import { fade, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import * as assetsReference from '../assets/assets';
import { getImages } from '../../../../common/utils/getImages';

const assets = getImages(assetsReference);

export const useUnlockWalletStyles = makeStyles<
  Theme,
  { count?: number; icon?: string; comingSoon?: boolean }
>(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(9, 10),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(8, 0),
    },
  },
  title: {
    margin: 0,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 3),
    },
  },
  list: {
    display: 'grid',
    gridTemplateColumns: props => `repeat(${props.count}, 200px)`,
    gridColumnGap: theme.spacing(4.5),
    margin: 0,
    marginTop: theme.spacing(6.5),
    padding: 0,
    listStyle: 'none',
    [theme.breakpoints.down('sm')]: {
      gridColumnGap: theme.spacing(2.5),
    },
    [theme.breakpoints.down('xs')]: {
      '&&': {
        gridTemplateColumns: '100%',
        gridColumnGap: 0,
        width: '100%',
      },
    },
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2.5),
    fontSize: 18,
    lineHeight: 1.2,
    fontWeight: 700,
    border: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
    borderRadius: 4,
    [theme.breakpoints.down('xs')]: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr 102px',
      gridTemplateAreas: props =>
        props.comingSoon ? '"icon title" "icon soon"' : '"icon title connect"',
      gridRowGap: props => props.comingSoon && theme.spacing(0.5),
      padding: theme.spacing(2.5, 3),
      fontSize: 16,
    },
    '&::before': {
      position: 'relative',
      content: '""',
      display: 'grid',
      justifyContent: 'center',
      alignContent: 'center',
      width: 100,
      height: 100,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
      borderRadius: '50%',
      backgroundColor: '#0F0F0F',
      backgroundImage: props =>
        props.icon ? `url(${assets[props.icon.toLowerCase()]})` : undefined,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      [theme.breakpoints.down('xs')]: {
        gridArea: 'icon',
        width: 44,
        height: 44,
        margin: 0,
        marginRight: theme.spacing(2),
        borderRadius: 4,
      },
    },
  },
  caption: {
    [theme.breakpoints.down('xs')]: {
      gridArea: 'title',
      alignSelf: props => (props.comingSoon ? 'flex-end' : 'center'),
    },
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      gridArea: props => (props.comingSoon ? 'soon' : 'connect'),
      justifySelf: props => props.comingSoon && 'start',
      alignSelf: props => (props.comingSoon ? 'flex-start' : 'center'),
      width: props => props.comingSoon && 'auto',
      marginTop: 0,
      maxHeight: props => (props.comingSoon ? 'none' : 40),
      minWidth: props => props.comingSoon && 0,
    },
  },
}));
