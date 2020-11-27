import { makeStyles } from '@material-ui/core/styles';
import * as assetsReference from './assets';
import { getImages } from '../../../../common/utils/getImages';
import { Theme } from '@material-ui/core';

const assets = getImages(assetsReference);

export const useFeaturesStyles = makeStyles<Theme, { icon?: string }>(
  theme => ({
    root: {
      padding: theme.spacing(9, 0, 20, 0),
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(16, 0),
      },
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(12, 0),
      },
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(8, 0),
      },
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(9, 1fr)',
      gridTemplateRows: 'auto 1fr',
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '100%',
        gridTemplateRows: 'auto auto auto',
      },
    },
    title: {
      gridColumn: '1/4',
      gridRow: '1/2',
      margin: 0,
      fontSize: 120,
      lineHeight: 1.05,
      [theme.breakpoints.down('md')]: {
        fontSize: 90,
      },
      [theme.breakpoints.down('sm')]: {
        gridColumn: '-1/1',
        fontSize: 48,
        lineHeight: 1.2,
      },
    },
    text: {
      gridColumn: '1/4',
      gridRow: '2/3',
      margin: 0,
      marginTop: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
        gridColumn: '-1/1',
        marginTop: theme.spacing(2.5),
      },
    },
    list: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gridColumn: '5/10',
      gridRow: '-1/1',
      gridRowGap: theme.spacing(13),
      margin: 0,
      padding: 0,
      listStyle: 'none',
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(9, 1fr)',
        gridColumn: '-1/1',
        gridRow: '3/4',
        gridRowGap: theme.spacing(6.5),
        marginTop: theme.spacing(8),
      },
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '100%',
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
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(1.5),
      },
    },
  }),
);
