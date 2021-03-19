import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStakerDashboardBnbStyles = makeStyles<Theme>(
  theme => ({
    content: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'minmax(260px, auto) 1fr',
      gridRowGap: theme.spacing(6),
      gridColumnGap: theme.spacing(5.5),
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
      },
    },
    stakeContent: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      borderRadius: 65,
      [theme.breakpoints.up('sm')]: {
        padding: 44,
      },
    },
    stake: {
      padding: 23,
      '&, &:hover': {
        background: theme.palette.primary.main,
      },
    },
    amount: {
      marginTop: 'auto',
      '& .unit': {
        fontSize: '34%',
      },
    },
    headerIcon: {
      verticalAlign: 'bottom',
      marginRight: theme.spacing(0.75),
    },
    divider: {
      alignSelf: 'stretch',
      height: 'unset',
      marginLeft: theme.spacing(3.5),
      marginRight: theme.spacing(3.5),
    },
    undelegate: {
      marginTop: theme.spacing(-1),
      marginBottom: theme.spacing(-1),
      marginLeft: theme.spacing(1.5),
    },
    title: {
      marginBottom: theme.spacing(1.5),
    },
    balance: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 65,
      [theme.breakpoints.up('sm')]: {
        padding: 44,
      },
    },
    table: {
      gridColumn: '1 / 3',
      [theme.breakpoints.down('sm')]: {
        gridColumn: '1',
      },
    },
  }),
  { index: 10 },
);
