import React from 'react';
import { HistoryTable } from './HistoryTable';
import { AuthorizedHeader } from '../../../../../layout/components/Header/AuthorizedHeader';
import { Providers } from '../../../../../../common/types';
import { FooterComponent } from '../../../../../layout/components/Footer/Footer';
import BigNumber from 'bignumber.js';
import { Curtains } from '../../../../../../UiKit/Curtains';
import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const useStoryStyles = makeStyles<Theme>(theme => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'initial',
    maxWidth: '100vw',
  },
  content: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: '100%',
    boxSizing: 'border-box',
    borderBottom: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    overflow: 'hidden',
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto auto 1fr',
    },
  },
  history: {
    gridColumn: '2/3',
    gridRow: '-1/1',
    height: 'calc(100vh - 160px)',
    boxSizing: 'border-box',
    padding: theme.spacing(7, 0, 3, 7.5),
    [theme.breakpoints.up(1920)]: {
      padding: theme.spacing(10, 0, 3, 7.5),
    },
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(5, 0, 3, 3.5),
    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: '-1/1',
      gridRow: 'auto',
      height: 'auto',
      padding: theme.spacing(5, 0),
    },
  },
}));

const DATA = [
  {
    action: 'STAKE_ACTION_PENDING',
    amount: new BigNumber(0.15),
    transactionHash: '#',
  },
  {
    action: 'STAKE_ACTION_PENDING',
    amount: new BigNumber(0.15),
    transactionHash: '#',
  },
  {
    action: 'STAKE_ACTION_PENDING',
    amount: new BigNumber(0.15),
    transactionHash: '#',
  },
  {
    action: 'STAKE_ACTION_PENDING',
    amount: new BigNumber(0.15),
    transactionHash: '#',
  },
  {
    action: 'STAKE_ACTION_PENDING',
    amount: new BigNumber(0.15),
    transactionHash: '#',
  },
  {
    action: 'STAKE_ACTION_PENDING',
    amount: new BigNumber(0.15),
    transactionHash: '#',
  },
  {
    action: 'STAKE_ACTION_PENDING',
    amount: new BigNumber(0.15),
    transactionHash: '#',
  },
  {
    action: 'STAKE_ACTION_PENDING',
    amount: new BigNumber(0.15),
    transactionHash: '#',
  },
  {
    action: 'STAKE_ACTION_PENDING',
    amount: new BigNumber(0.15),
    transactionHash: '#',
  },
  {
    action: 'STAKE_ACTION_PENDING',
    amount: new BigNumber(0.15),
    transactionHash: '#',
  },
  {
    action: 'STAKE_ACTION_PENDING',
    amount: new BigNumber(0.15),
    transactionHash: '#',
  },
  {
    action: 'STAKE_ACTION_PENDING',
    amount: new BigNumber(0.15),
    transactionHash: '#',
  },
];

const HistoryTableStory = () => {
  const classes = useStoryStyles();
  return (
    <div className={classes.page}>
      <AuthorizedHeader
        className={classes.header}
        walletAddress="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        walletType={Providers.metamask}
        ethereumBalance={23.4536334}
        ankrBalance={10500.45}
      />
      <div className={classes.main}>
        <section className={classes.content}>
          <Curtains className={classes.wrapper}>
            <HistoryTable className={classes.history} data={DATA} />
          </Curtains>
        </section>
      </div>
      <FooterComponent className={classes.footer} isAuth={true} />
    </div>
  );
};

export const HistoryTableExample = () => <HistoryTableStory />;

export default {
  title: 'components/HistoryTable',
};
