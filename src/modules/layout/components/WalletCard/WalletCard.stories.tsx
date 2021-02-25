import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BigNumber from 'bignumber.js';
import React from 'react';
import { WalletBalance } from '../WalletBalance';
import { WalletCard } from './WalletCard';

const useStyles = makeStyles<Theme>(theme => ({
  block: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  content: {
    marginBottom: 16,
  },
}));

const DefaultStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <WalletCard
        className={classes.content}
        visible={true}
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        balance={
          <WalletBalance
            ethereum={new BigNumber(23)}
            ankr={new BigNumber(10500)}
          />
        }
      />
    </div>
  );
};

export const Default = () => <DefaultStory />;

export default {
  title: 'modules/Layout/components/WalletCard',
};
