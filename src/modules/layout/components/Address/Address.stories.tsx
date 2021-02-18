import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Address } from './Address';
import { Provider } from '../../../../common/types';

const useStyles = makeStyles<Theme>(() => ({
  block: {},
}));

const AddressStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Address
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        provider={Provider.metamask}
      />
      <Address
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        provider={Provider.wallet}
      />
    </div>
  );
};

export const AddressExample = () => <AddressStory />;

export default {
  title: 'modules/Layout/components/Address',
};
