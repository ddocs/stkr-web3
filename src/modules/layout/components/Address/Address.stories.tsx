import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Address } from './Address';

const useStyles = makeStyles<Theme>(() => ({
  block: {},
}));

const AddressStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Address
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        walletIcon="https://via.placeholder.com/24"
      />
      <Address address="0x603366e08380EceB2E334621A27eeD36F34A9D50" />
    </div>
  );
};

export const AddressExample = () => <AddressStory />;

export default {
  title: 'modules/Layout/components/Address',
};
