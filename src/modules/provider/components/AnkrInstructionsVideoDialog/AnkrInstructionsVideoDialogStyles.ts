import { fade, makeStyles } from '@material-ui/core/styles';

export const useAnkrInstructionsVideoDialogStyles = makeStyles(theme => ({
  close: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  dialogPaper: {
    background: 'none',
  },
  root: {
    '&:first-child': {
      paddingTop: theme.spacing(10),
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(10),
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 44,
    backgroundColor: '#0F0F0F',
  },
  header: {
    textAlign: 'center',
    paddingBottom: theme.spacing(6),
  },
  content: {
    marginTop: theme.spacing(3),
    width: 560,
    textAlign: 'justify',
    fontSize: 16,
  },
  preview: {
    width: 560,
    position: 'relative',
  },
  play: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    transition: 'transform 300ms',
    cursor: 'pointer',
    '& circle': {
      fill: fade(theme.palette.common.white, 0.5),
    },
    '&:hover ': {
      transform: 'scale(1.17)',
      '& circle': {
        fill: fade(theme.palette.common.white, 0.8),
      },
    },
  },
  button: {
    marginTop: theme.spacing(6),
    width: 560,
    padding: theme.spacing(2),
  },
}));
