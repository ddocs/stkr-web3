import * as React from 'react';
import { useCallback } from 'react';
import { useDepositStyles } from './DepositStyles';
import { Box, Button, Typography } from '@material-ui/core';
import { IDepositPayload } from '../../screens/Convert';

export interface IDepositProps {
  onDeposit: (payload: IDepositPayload) => void;
  depositAddress: string;
  amount: number;
  disabled: boolean;
}

export const Deposit = ({
  onDeposit,
  depositAddress,
  amount,
  disabled,
}: IDepositProps) => {
  const classes = useDepositStyles();

  const handleDeposit = useCallback(() => {
    onDeposit({ depositAddress, amount });
  }, [amount, depositAddress, onDeposit]);

  return (
    <div className={classes.root}>
      <Box mb={5}>
        <Typography variant="h3" align="center">
          You have active swap request
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" width="100%">
        <Button
          variant="contained"
          color="primary"
          onClick={handleDeposit}
          disabled={disabled}
          size="large"
        >
          Swap {amount} ETH
        </Button>
      </Box>
    </div>
  );
};
