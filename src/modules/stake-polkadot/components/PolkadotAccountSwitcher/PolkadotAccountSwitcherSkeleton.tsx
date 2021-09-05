import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Button } from '../../../../UiKit/Button';
import { usePolkadotAccountSwitcherStyles } from './PolkadotAccountSwitcherStyles';

export const PolkadotAccountSwitcherSkeleton = () => {
  const classes = usePolkadotAccountSwitcherStyles();

  return (
    <Button
      className={classes.button}
      variant="outlined"
      color="secondary"
      isLoading
      disabled
    >
      <Skeleton width={90} variant="text" />
    </Button>
  );
};
