import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Seconds } from '../../../../common/types';

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
    display: 'inline-block',
    gridArea: 'logo',
    fontSize: 100,
    marginBottom: theme.spacing(2.5),

    [theme.breakpoints.up('sm')]: {
      fontSize: 90,
      margin: 0,
    },

    [theme.breakpoints.up('md')]: {
      fontSize: 150,
    },

    '& svg': {
      display: 'block',
      width: '1em',
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

  content: {
    gridArea: 'content',
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

  btnMobile: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  btnMobileWithAnimation: {
    opacity: 0,
    transform: 'translateY(10px)',
    transition: `opacity ${btnAnimationTime}s ${textAnimationDelay}s, transform ${btnAnimationTime}s ${textAnimationDelay}s`,
  },

  btnMobileAnimated: {
    opacity: 1,
    transform: 'translateY(0)',
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
    width: 58,
    height: 58,
    minWidth: 0,
    marginLeft: theme.spacing(3),
    padding: 0,
    borderRadius: '50%',

    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },

  btnWithAnimation: {
    opacity: 0,
    transform: 'scale(0.8)',
    transition: `opacity ${btnAnimationTime}s ${btnAnimationDelay}s, transform ${btnAnimationTime}s ${btnAnimationDelay}s`,
  },

  btnAnimated: {
    opacity: 1,
    transform: 'scale(1)',
  },
}));
