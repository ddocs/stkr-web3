import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useTopUpStyles = makeStyles<Theme>(theme => {
  const item = {
    display: 'grid',
    gridTemplateColumns: '1fr minmax(0, 337px)',
    gridRowGap: theme.spacing(3),
    padding: theme.spacing(5.5, 0),
    borderBottom: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
  };

  return {
    component: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '100%',
      gridTemplateRows: '100%',
      height: '100%',
      padding: theme.spacing(10, 11),
      boxSizing: 'border-box',
    },
    section: {
      height: '100%',
      boxSizing: 'border-box',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      margin: 0,
    },
    list: {
      width: '100%',
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    item: {
      ...item,
    },
    depositItem: {
      ...item,
      gridTemplateColumns: '1fr minmax(0, 526px)',
      '&:first-child': {
        paddingTop: theme.spacing(11),
      },
    },
    count: {
      gridColumn: '-1/1',
    },
    caption: {},
    input: {},
    text: {
      gridColumn: '1/2',
      maxWidth: 680,
    },
    buy: {
      gridColumn: '2/3',
      marginLeft: theme.spacing(1),
    },
    submit: {
      alignSelf: 'flex-end',
      minWidth: 214,
      marginTop: theme.spacing(9),
    },
    deposit: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: theme.spacing(2),
    },
    depositButton: {
      gridRow: 2,
      gridColumn: '1/3',
      marginTop: theme.spacing(4.5),
    },
    depositTitle: {
      marginBottom: theme.spacing(2),
    },
    delimiterText: {
      color: fade(theme.palette.common.white, 0.5),
    },
    depositTypeButton: {
      minHeight: 80,
    },
    depositDelimiter: {
      display: 'flex',
      alignItems: 'center',
    },
    depositTypeSwitcher: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      gridGap: theme.spacing(3),
    },
    ethValue: {
      marginBottom: theme.spacing(2.5),
    },
    allowance: {},
    allowanceDoneTitle: {
      display: 'flex',
      alignItems: 'center',
    },
    allowanceDoneIcon: {
      marginRight: theme.spacing(1),
    },
  };
});
