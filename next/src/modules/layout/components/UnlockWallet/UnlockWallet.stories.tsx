import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { UnlockWallet } from './UnlockWallet';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const UnlockWalletStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <UnlockWallet
        open={true}
        onClose={() => alert('Close')}
        onConnectMetamask={() => alert('Connect metamask')}
        onInstallMetamask={() => alert('Install metamask')}
        onConnectWallet={() => alert('Connect wallet')}
      />
    </div>
  );
};

export const UnlockWalletExample = () => <UnlockWalletStory />;

export default {
  title: 'modules/Layout/UnlockWallet',
};
