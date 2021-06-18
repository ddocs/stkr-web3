import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useDepositStyles = makeStyles<Theme>(theme => ({
  paper: {
    padding: 0,
    maxWidth: 805,
    margin: '0 auto auto auto',
    width: '100%',
  },
  title: {
    marginTop: 'auto',
    marginBottom: theme.spacing(7),
  },
  tab: {
    borderRight: `1px solid ${fade('#ffffff', 0.2)}`,
  },
  tabs: {
    borderBottom: `1px solid ${fade('#ffffff', 0.2)}`,
  },
  tabsFlexContainer: {
    minHeight: 100,
  },
  notice: {
    fontSize: 20,
    color: fade(theme.palette.common.white, 0.5),
  },
  buy: {
    maxWidth: 194,
  },
  timelineNotCurrentContent: {
    color: fade(theme.palette.common.white, 0.5),
  },
  ethSliderAmount: {
    marginBottom: theme.spacing(2.5),
  },
  ethTopUpNotice: {
    color: fade(theme.palette.common.white, 0.5),
    fontWeight: 'normal',
    lineHeight: '154%',
  },
  ethTopUpButton: {
    maxWidth: 226,
  },
  cancel: {
    position: 'absolute',
    right: theme.spacing(5),
    top: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      right: theme.spacing(2),
    },
  },
  info: {
    fontSize: 16,
    paddingLeft: theme.spacing(2.5),
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },
}));
