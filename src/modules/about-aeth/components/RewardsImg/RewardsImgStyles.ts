import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Seconds } from '../../../../common/types';
import { getEm } from '../../../../common/utils/styleUtils';

const rootSize = 482;
const increaseSize = 35;
const transitionTime: Seconds = 1;
const transitionDelay: Seconds = 0;
const transitionEasing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

export const useRewardsImgStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    width: '1em',
    lineHeight: 0,
  },

  cylinderImg: {
    width: '100%',
  },

  gainFiller: {
    position: 'absolute',
    left: getEm(79, rootSize),
    right: getEm(84, rootSize),
    bottom: getEm(248, rootSize),
    height: getEm(48, rootSize),
    background:
      'linear-gradient(270deg, #BC95FF 0%, #843FFB 2.38%, #743BD5 12.7%, #985EFB 90.6%, #8B4FF1 96.9%, #999DFF 100%)',
  },

  gainFillerWithAnimations: {
    transition: `height ${transitionTime}s ${transitionEasing} ${transitionDelay}s`,
  },
  gainFillerAnimated: {
    height: getEm(48 + increaseSize, rootSize),
  },

  gainFillerTop: {
    position: 'absolute',
    left: getEm(80, rootSize),
    right: getEm(84, rootSize),
    bottom: getEm(250, rootSize),
    height: getEm(89, rootSize),
    borderRadius: '50%',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.71) 0%, rgba(116, 37, 245, 0.41) 100%), linear-gradient(270deg, #BC95FF 0%, #7637E1 2.38%, #44227E 12.7%, #8451DC 90.6%, #6F3EC1 96.9%, #999DFF 100%)',
    boxShadow: '0px 0px 2px rgba(255, 255, 255, 0.25)',
  },

  gainFillerTopWithAnimations: {
    transition: `bottom ${transitionTime}s ${transitionEasing} ${transitionDelay}s`,
  },

  gainFillerTopAnimated: {
    bottom: getEm(250 + increaseSize, rootSize),
  },

  gainTopImg: {
    position: 'absolute',
    top: 0,
    left: getEm(80, rootSize),
    right: getEm(84, rootSize),
    height: getEm(89, rootSize),
    borderRadius: '50%',
    background:
      'linear-gradient(90deg, rgba(54, 54, 54, 0.58) 0%, rgba(20, 19, 24, 0.15) 13.11%, #0F0F0F 49.31%, rgba(8, 4, 26, 0.15) 86.46%, rgba(24, 9, 50, 0.45) 96.59%, #01030F 100%), #0F0F0F',
    boxShadow: 'inset 0px 1px 3px rgba(255, 255, 255, 0.26)',
  },

  text: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    height: 0,
  },

  textElement: {
    marginTop: '-0.5em',
    lineHeight: 1,
    fontWeight: 500,
  },

  textRewards: {
    bottom: getEm(230, rootSize),
  },

  textRewardsWithAnimation: {
    transition: `bottom ${transitionTime}s ${transitionEasing} ${transitionDelay}s`,
  },

  textRewardsAnimated: {
    bottom: getEm(230 + increaseSize / 2, rootSize),
  },

  textStaked: {
    bottom: getEm(134, rootSize),
  },

  aeth: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right: 14,
    height: getEm(148, rootSize),
    bottom: getEm(138, rootSize),
    width: 13,
    border: 'solid rgba(255,255,255, 0.15)',
    borderWidth: '1px 1px 1px 0',

    [theme.breakpoints.up('sm')]: {
      right: 24,
    },

    [theme.breakpoints.up('md')]: {
      width: 23,
    },

    [theme.breakpoints.up('lg')]: {
      right: 22,
    },
  },

  aethWithAnimations: {
    transition: `height ${transitionTime}s ${transitionEasing} ${transitionDelay}s`,
  },

  aethAnimated: {
    height: getEm(148 + increaseSize, rootSize),
  },

  aethText: {
    background: theme.palette.background.default,
    padding: '3px 0',
    fontWeight: 500,
  },
}));
