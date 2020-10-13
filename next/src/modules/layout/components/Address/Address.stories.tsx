import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Address } from './Address';
import { Providers } from '../../../../common/types';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const AddressStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Address
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        type={Providers.metamask}
      />
      <Address
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        type={Providers.wallet}
      />
    </div>
  );
};

export const AddressExample = () => <AddressStory />;

export default {
  title: 'modules/Layout/components/Address',
};
