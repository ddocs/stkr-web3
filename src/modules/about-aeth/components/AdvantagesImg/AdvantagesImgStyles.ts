import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getEm } from '../../../../common/utils/styleUtils';

const rootSize = 397;
const glassGradient =
  'linear-gradient(270deg, #FFFFFF 0.21%, rgba(247, 245, 254, 0.505379) 2.48%, rgba(209, 200, 251, 0.15) 13.29%, rgba(123, 98, 243, 0.06) 49.42%, rgba(209, 200, 251, 0.15) 86.49%, rgba(54, 87, 236, 0.63) 96.6%, #7991FF 100%)';

export const useAdvantagesImgStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    width: '1em',
    padding: `${getEm(34, rootSize)} 0`,
  },

  rectangle: {
    display: 'block',
    width: getEm(180, rootSize),
    height: getEm(425, rootSize),
    margin: '0 auto',
    background: `rgba(255,255,255, 0.4) ${glassGradient}`,
    boxShadow: 'inset 0px 2px 2px rgba(255, 255, 255, 0.25)',
    borderRadius: getEm(12, rootSize),
    transform: 'skew(0deg, -23deg)',

    '@supports ((-webkit-backdrop-filter: blur(38px)) or (backdrop-filter: blur(38px)))': {
      backdropFilter: 'blur(38px)',
      background: glassGradient,
    },
  },

  ethereum: {
    position: 'absolute',
    right: 0,
    top: getEm(80, rootSize),
    width: getEm(185, rootSize),
  },

  aeth: {
    position: 'absolute',
    left: getEm(10, rootSize),
    top: getEm(120, rootSize),
    width: getEm(202, rootSize),
  },

  logo: {
    display: 'block',
    width: '100%',
  },
}));
