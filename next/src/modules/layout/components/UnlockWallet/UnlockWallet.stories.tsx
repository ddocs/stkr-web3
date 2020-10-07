import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { UnlockWalletContentComponent } from './UnlockWalletContent';
import { CustomDialog } from '../../../../components/CustomDialog';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const UnlockWalletStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <CustomDialog
        open={true}
        onClose={() => alert('Close')}
        transitionOpacity={true}
        maxWidth="sm"
      >
        <UnlockWalletContentComponent
          onConnectMetamask={() => alert('Connect metamask')}
          onInstallMetamask={() => alert('Install metamask')}
          onConnectWallet={() => alert('Connect wallet')}
        />
      </CustomDialog>
    </div>
  );
};

export const UnlockWalletExample = () => <UnlockWalletStory />;

export default {
  title: 'modules/Layout/UnlockWallet',
};