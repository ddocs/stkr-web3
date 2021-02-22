import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStakerDashboardTotalPanelStyles = makeStyles<Theme>(theme => ({
  stakedContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    padding: '41px 45px 30px',
    borderRadius: 65,
    [theme.breakpoints.down('md')]: {
      borderRadius: 32,
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4, 2.5),
    },
  },

  title: {
    fontSize: 20,
    fontWeight: 500,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  bottomRow: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  amount: {
    fontSize: 52,
    lineHeight: 1,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    '& .unit': {
      fontSize: 16,
      paddingLeft: 8,
    },
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 44,
    },
  },
  stake: {
    padding: 17.5,
    '&, &:hover': {
      background: theme.palette.primary.main,
    },
  },

  claim: {
    marginLeft: theme.spacing(2.5),
    width: 110,
    height: 44,
    borderRadius: 65,
  },

  buttonContainer: {
    position: 'relative',
    top: -12,
    right: -16,
    [theme.breakpoints.down('md')]: {
      right: 0,
    },
  },
  childrenContainer: {
    marginTop: theme.spacing(4.5),
  },
}));
