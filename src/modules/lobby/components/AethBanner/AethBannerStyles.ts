import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Seconds } from '../../../../common/types';

// appearance timings
const animationStep: Seconds = 0.15;
const boxAnimationTime: Seconds = 0.3;
const logoAnimationTime: Seconds = 0.6;
const titleAnimationTime: Seconds = 0.6;
const textAnimationTime: Seconds = 0.6;
const btnAnimationTime: Seconds = 0.6;
const btnLabelAnimationTime: Seconds = 0.8;
const titleAnimationDelay: Seconds = logoAnimationTime - animationStep * 2;
const textAnimationDelay: Seconds = logoAnimationTime - animationStep;
const btnAnimationDelay: Seconds = logoAnimationTime + animationStep * 3;
const btnLabelAnimationDelay: Seconds = logoAnimationTime + animationStep * 4;

// hover settings
const hoverAnimationTime: Seconds = 0.4;
const hoverAnimationEasing = 'ease';

export const useAethBannerStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(0, 0, 10),
  },

  box: {
    display: 'block',
    padding: theme.spacing(3, 3, 3.5),
    border: `1px solid ${fade('#fff', 0.2)}`,
    borderRadius: 63,
    transition: 'border 0.2s',

    color: theme.palette.text.primary,
    textDecoration: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gridTemplateAreas: `
        'logo content link'
      `,
      gap: theme.spacing(0, 2),
      alignItems: 'center',
      padding: theme.spacing(4, 3),
    },

    [theme.breakpoints.up('md')]: {
      gap: theme.spacing(0, 5.5),
      padding: theme.spacing(4, 7),
    },

    '&:hover': {
      borderColor: fade('#fff', 0.4),
      color: theme.palette.text.primary,
    },
  },

  boxWithAnimation: {
    borderColor: fade('#fff', 0),
    transition: `border ${boxAnimationTime}s`,
  },

  boxAnimated: {
    borderColor: fade('#fff', 0.2),
  },

  logo: {
    position: 'relative',
    display: 'inline-block',
    gridArea: 'logo',
    marginBottom: theme.spacing(2.5),

    [theme.breakpoints.up('sm')]: {
      margin: 0,
    },
  },

  logoWithAnimation: {
    opacity: 0,
    transform: 'scale(0.8)',
    transition: `opacity ${logoAnimationTime}s, transform ${logoAnimationTime}s`,
  },

  logoAnimated: {
    opacity: 1,
    transform: 'scale(1)',
  },

  logoIcon: {
    display: 'block',
    width: '1em',
    height: 'auto',
    fontSize: 100,

    [theme.breakpoints.up('sm')]: {
      fontSize: 90,
    },

    [theme.breakpoints.up('md')]: {
      fontSize: 150,
    },
  },

  logoIconEtherium: {
    position: 'absolute',
    opacity: 0,
    transition: `all ${hoverAnimationTime}s ${hoverAnimationEasing}`,

    '$box:hover &': {
      transform: 'translate(50%, -20%) scale(0.7)',
      opacity: 0.8,

      [theme.breakpoints.up('sm')]: {
        transform: 'translate(20%, -30%) scale(0.7)',
      },

      [theme.breakpoints.up('lg')]: {
        transform: 'translate(40%, -20%) scale(0.7)',
      },
    },
  },

  logoIconAeth: {
    position: 'relative',
    transition: `all ${hoverAnimationTime}s ${hoverAnimationEasing}`,

    '$box:hover &': {
      transform: 'translate(0, 5%)',

      [theme.breakpoints.up('sm')]: {
        transform: 'translate(-10%, 18%)',
      },

      [theme.breakpoints.up('lg')]: {
        transform: 'translate(-10%, 5%)',
      },
    },
  },

  content: {
    gridArea: 'content',

    [theme.breakpoints.up('lg')]: {
      transition: `padding ${hoverAnimationTime}s ${hoverAnimationEasing}`,
    },

    '$box:hover &': {
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 30,
      },
    },
  },

  title: {
    marginBottom: theme.spacing(2),
  },

  titleWithAnimation: {
    opacity: 0,
    transform: 'translateX(-10px)',
    transition: `opacity ${titleAnimationTime}s ${titleAnimationDelay}s, transform ${titleAnimationTime}s ${titleAnimationDelay}s`,
  },

  titleAnimated: {
    opacity: 1,
    transform: 'translateX(0)',
  },

  text: {
    opacity: 0.9,
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
  },

  textWithAnimation: {
    opacity: 0,
    transform: 'translateX(-10px)',
    transition: `opacity ${textAnimationTime}s ${textAnimationDelay}s, transform ${textAnimationTime}s ${textAnimationDelay}s`,
  },

  textAnimated: {
    opacity: 1,
    transform: 'translateX(0)',
  },

  linkWrap: {
    gridArea: 'link',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
  },

  btnWrap: {
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      marginLeft: theme.spacing(3),
    },
  },

  btnWrapWithAnimation: {
    opacity: 0,
    transform: 'translateY(10px)',
    transition: `opacity ${btnAnimationTime}s ${textAnimationDelay}s, transform ${btnAnimationTime}s ${textAnimationDelay}s`,

    [theme.breakpoints.up('sm')]: {
      transform: 'scale(0.8)',
      transition: `opacity ${btnAnimationTime}s ${btnAnimationDelay}s, transform ${btnAnimationTime}s ${btnAnimationDelay}s`,
    },
  },

  btnWrapAnimated: {
    opacity: 1,
    transform: 'translateY(0)',

    [theme.breakpoints.up('sm')]: {
      transform: 'scale(1)',
    },
  },

  btnMobile: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  btnLabel: {
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  btnLabelWithAnimation: {
    opacity: 0,
    transform: 'translateX(10px)',
    transition: `opacity ${btnLabelAnimationTime}s ${btnLabelAnimationDelay}s, transform ${btnLabelAnimationTime}s ${btnLabelAnimationDelay}s`,
  },

  btnLabelAnimated: {
    opacity: 1,
    transform: 'translateX(0)',
  },

  btn: {
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      width: 58,
      height: 58,
      minWidth: 0,
      padding: 0,
      borderRadius: '50%',
    },
  },
}));
