import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStakeStyles = makeStyles<Theme, { icon?: string }>(theme => {
  const contentPadding = theme.spacing(6, 22.5, 7, 22.5);

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
    },
    brand: {
      position: 'absolute',
      top: 7,
      right: -52,
    },
    footer: {
      width: '100%',
      padding: contentPadding,
      backgroundColor: '#191919',
    },
    submit: {
      maxWidth: 180,
    },
    note: {
      maxWidth: 560,
    },
    socials: {
      display: 'grid',
      gridGap: 20,
      justifyContent: 'flex-start',
      gridTemplateColumns: 'auto auto',
    },
    form: {
      width: '100%',
    },
    question: {
      padding: theme.spacing(1),
    },
  };
});
