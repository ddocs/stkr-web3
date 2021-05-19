import { Paper, Typography, Button } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useBalanceStyles } from './BalanceStyles';
import { t } from '../../../../common/utils/intl';
import BigNumber from 'bignumber.js';
import { Mutation } from '@redux-requests/react';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { getStakingSession } from '../../../avalanche-sdk/utils';
import { StakingStep } from '../../../avalanche-sdk/types';

interface IBalanceProps {
  amount: BigNumber;
}

export const Balance = ({ amount }: IBalanceProps) => {
  const classes = useBalanceStyles();
  const dispatch = useRequestDispatch();

  const isPendingWithdrawal = useMemo(() => {
    const session = getStakingSession();
    return session?.nextStep === StakingStep.WithdrawAvax;
  }, []);

  const isPendingClaim = useMemo(() => {
    const session = getStakingSession();
    return session?.nextStep === StakingStep.ClaimAvax;
  }, []);

  const handleWithdraw = useCallback(() => {
    dispatch(AvalancheActions.withdrawAvax());
  }, [dispatch]);

  const handleClaim = useCallback(() => {
    dispatch(AvalancheActions.claimAvax());
  }, [dispatch]);

  const renderButtons = useCallback(() => {
    return (
      <>
        {isPendingWithdrawal && (
          <Mutation type={AvalancheActions.withdrawAvax.toString()}>
            {({ loading }) => (
              <Button
                color="primary"
                size="large"
                className={classes.button}
                onClick={handleWithdraw}
                disabled={loading}
              >
                {t('stake-avax.dashboard.finish-withdraw')}
              </Button>
            )}
          </Mutation>
        )}
        {isPendingClaim && (
          <Mutation type={AvalancheActions.claimAvax.toString()}>
            {({ loading }) => {
              return (
                <Button
                  color="primary"
                  size="large"
                  className={classes.button}
                  onClick={handleClaim}
                  disabled={loading}
                >
                  {t('stake-avax.dashboard.claim')}
                </Button>
              );
            }}
          </Mutation>
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingClaim, isPendingWithdrawal]);

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <Typography variant="body1" className={classes.header}>
        {t('stake-avax.dashboard.avax-balance')}
      </Typography>
      <div className={classes.footer}>
        <div className={classes.amount}>
          <Typography variant="h2">{amount.toFixed(2)}</Typography>
          <Typography variant="h6">{t('stake-avax.avax')}</Typography>
        </div>
        {renderButtons()}
      </div>
    </Paper>
  );
};
