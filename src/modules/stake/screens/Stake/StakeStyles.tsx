import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStakeStyles = makeStyles<Theme>(theme => {
  const contentPadding = theme.spacing(6, 22.5, 8.5, 22.5);

  return {
    component: {
      width: '100%',
      height: '100%',
      padding: theme.spacing(9, 0),
      boxSizing: 'border-box',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    content: {
      padding: contentPadding,
      position: 'relative',
      width: '100%',
    },
    cancel: {
      position: 'absolute',
      right: 25,
      top: 28,
    },
    header: {
      position: 'relative',
      marginBottom: theme.spacing(12),
    },
    footer: {
      width: '100%',
      padding: contentPadding,
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      marginBottom: theme.spacing(3),
      display: 'flex',
      justifyContent: 'flex-end',
    },
    submit: {
      maxWidth: 230,
      height: 54,
    },
    note: {
      fontSize: 14,
      fontWeight: 400,
      alignSelf: 'flex-start',
    },
    form: {
      width: '100%',
    },
    question: {
      padding: theme.spacing(1),
    },
    amountError: {
      textAlign: 'right',
    },
    label: {
      fontSize: 20,
      fontWeight: 400,
    },
  };
});
