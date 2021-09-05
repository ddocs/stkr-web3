import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BigNumber from 'bignumber.js';

export const useClaimStyles = makeStyles<Theme, { amount: BigNumber }>(
  theme => {
    return {
      root: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(5, 5, 3),
        [theme.breakpoints.down('md')]: {
          maxWidth: '100%',
        },
      },
      header: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 500,
        marginBottom: theme.spacing(6),
      },
      footer: {
        display: 'flex',
        gridTemplateColumns: 'auto auto auto',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'left',
      },
      info: {
        alignSelf: 'start',
        paddingLeft: theme.spacing(2.5),
        borderLeft: `2px solid ${theme.palette.primary.main}`,
        textAlign: 'left',
        fontSize: 14,
      },
      buttonClaim: {
        width: 144,
      },
      amount: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        paddingRight: theme.spacing(2),
        gridGap: theme.spacing(1),
        alignItems: 'baseline',
      },
      amountLabel: {
        fontSize: 46,
      },
      question: {
        padding: theme.spacing(1),
      },
    };
  },
);
