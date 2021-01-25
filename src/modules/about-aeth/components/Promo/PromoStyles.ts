import { makeStyles } from '@material-ui/core/styles';
import { Seconds } from '../../../../common/types';

const imgShiftSize = '40px';

const globalAnimationDelay: Seconds = 0.3;
const textAnimationTime: Seconds = 0.8;
const imgAnimationDelay: Seconds =
  globalAnimationDelay + textAnimationTime - 0.2;
const imgAnimationTime: Seconds = 2;
const imgHorizonDelay: Seconds = imgAnimationTime;
const imgHorizonAnimationTime: Seconds = 2;

export const usePromoStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(14, 0, 7.5),
    position: 'relative',
    zIndex: 0,
    overflow: 'hidden',

    [theme.breakpoints.up('sm')]: {
      padding: `17vh 0 ${theme.spacing(15.5)}px`,
    },
  },

  img: {
    position: 'relative',
    maxWidth: 183,
    margin: theme.spacing(0, 'auto', 3),
    zIndex: -1,

    [theme.breakpoints.up('sm')]: {
      maxWidth: 280,
      margin: theme.spacing(0, 'auto', 1.5),
    },

    [theme.breakpoints.up('md')]: {
      maxWidth: 368,
    },

    '& svg': {
      display: 'block',
      width: '100%',
    },
  },

  imgHorizon: {
    '&::before': {
      content: `''`,
      position: 'absolute',
      zIndex: -1,
      top: '50%',
      left: '50%',

      width: '234px',
      height: '579px',

      background:
        'linear-gradient(180deg, #0F0F0F 2.78%, rgba(15, 15, 15, 0.88) 19.62%, rgba(15, 15, 15, 0) 49.41%, rgba(15, 15, 15, 0.88) 79.21%, #0F0F0F 97.32%), linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 1.92%), linear-gradient(270deg, #0F0F0F 0.21%, #101010 51.98%, #271AA2 91.5%, #4B38FF 95.84%, #A77DFF 100%)',
      borderRadius: '12px',
      transform: 'translate(-50%, calc(-50% + 117px)) rotate(90deg)',

      opacity: 0,
      transition: `opacity ${imgHorizonAnimationTime}s ease-in ${imgHorizonDelay}s`,

      [theme.breakpoints.up('sm')]: {
        height: '1000px',
      },

      [theme.breakpoints.up('md')]: {
        height: '1528px',
      },
    },

    '&$imgAnimated': {
      '&::before': {
        opacity: 1,
      },
    },
  },

  imgShadow: {
    '&::after': {
      content: `''`,
      position: 'absolute',
      top: 0,
      left: '50%',
      width: '100vw',
      height: '120%',
      marginLeft: '-50vw',
      background:
        'linear-gradient(0deg, rgba(15, 15, 15, 1) 0%, rgba(15, 15, 15, 0) 80%)',

      [theme.breakpoints.up('sm')]: {
        top: imgShiftSize,
      },
    },
  },

  imgWithAnimation: {
    transition: `all ${imgAnimationTime}s ease ${imgAnimationDelay}s`,
    transform: `translateY(${imgShiftSize})`,
    opacity: 0,
  },

  imgAnimated: {
    opacity: 1,
    transform: `translateY(0)`,
  },

  textContent: {
    textAlign: 'center',
  },

  textContentWithAnimation: {
    opacity: 0,
    transform: 'translateY(15px)',
    transition: `all ${textAnimationTime}s ease ${globalAnimationDelay}s`,
  },

  textContentAnimated: {
    opacity: 1,
    transform: 'translateY(0)',
  },

  title: {
    margin: theme.spacing(0, 0, 2.5),

    [theme.breakpoints.up('sm')]: {
      fontSize: 60,
    },
  },

  descr: {
    maxWidth: 650,
    margin: '0 auto',

    [theme.breakpoints.up('sm')]: {
      fontSize: 22,
    },
  },
}));
