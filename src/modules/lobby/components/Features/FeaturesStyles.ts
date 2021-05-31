import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getImages } from '../../../../common/utils/getImages';
import * as assetsReference from './assets';

const assets = getImages(assetsReference);

export const useFeaturesStyles = makeStyles<Theme, { icon?: string }>(
  theme => ({
    root: {
      padding: theme.spacing(5, 0),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(12, 0),
      },

      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(9, 0, 12, 0),
      },
    },

    wrapper: {
      [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridTemplateColumns: 'repeat(9, 1fr)',
        gridTemplateRows: 'auto 1fr',
      },
    },

    content: {
      [theme.breakpoints.up('md')]: {
        gridColumn: '1/4',
        position: 'sticky',
        top: theme.spacing(1),
      },
    },

    title: {
      margin: 0,
      fontSize: 48,
      lineHeight: 1.2,

      [theme.breakpoints.up('md')]: {
        fontSize: 54,
        lineHeight: 1.05,
      },

      [theme.breakpoints.up('lg')]: {
        fontSize: 64,
      },
    },

    text: {
      margin: theme.spacing(2.5, 0, 0),

      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(4),
        fontSize: 21,
        lineHeight: 1.6,
      },
    },

    list: {
      display: 'grid',
      gridRowGap: theme.spacing(6.5),

      margin: theme.spacing(8, 0, 0),
      padding: 0,
      listStyle: 'none',

      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(9, 1fr)',
      },

      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridColumn: '5/10',
        gridRow: '-1/1',
        gridRowGap: theme.spacing(10.5),
        margin: 0,
      },
    },

    item: {
      display: 'grid',
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto auto 1fr',
      gridTemplateAreas: '"icon" "title" "text"',

      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: 'auto auto',
        gridTemplateAreas: '"icon title" "icon text"',
      },

      '&:nth-child(2n+1)': {
        gridColumn: '1/3',

        [theme.breakpoints.down('sm')]: {
          gridColumn: '1/5',
        },

        [theme.breakpoints.down('xs')]: {
          gridColumn: '-1/1',
        },
      },

      '&:nth-child(2n+2)': {
        gridColumn: '4/6',

        [theme.breakpoints.down('sm')]: {
          gridColumn: '6/10',
        },

        [theme.breakpoints.down('xs')]: {
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

        [theme.breakpoints.down('xs')]: {
          marginBottom: 0,
          marginRight: theme.spacing(2.5),
        },
      },
    },

    itemCaption: {
      gridArea: 'title',
      margin: 0,
    },

    itemText: {
      gridArea: 'text',
      margin: 0,
      marginTop: theme.spacing(3),
      opacity: 0.9,

      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(1.5),
      },
    },
  }),
);
