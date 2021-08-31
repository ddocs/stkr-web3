import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BlockchainNetworkId } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';
import { Queries } from '../../../../components/Queries/Queries';
import { QueryLoadingCentered } from '../../../../components/QueryLoading/QueryLoading';
import { selectUserChainId } from '../../../../store/reducers/userReducer';
import { Curtains } from '../../../../UiKit/Curtains';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { IStakerStats, StakingStep } from '../../api/types';
import { Balance } from '../Balance';
import { Claim } from '../Claim';
import { Convert } from '../Convert';
import { FinishClaim } from '../FinishClaim';
import { Timer } from '../Timer';
import { useDashboardStyles } from './DashboardStyles';
import { useQuery } from '@redux-requests/react';
import { HistoryTable } from '../HistoryTable';
import BigNumber from 'bignumber.js';

export interface IDashboardProps {
  step: StakingStep;
}

const bnZero = new BigNumber(0);

export const Dashboard = ({ step }: IDashboardProps) => {
  const classes = useDashboardStyles();
  const dispatch = useDispatch();
  const currentChainId = useSelector(selectUserChainId);

  const isAvalancheChain =
    currentChainId === BlockchainNetworkId.avalanche ||
    currentChainId === BlockchainNetworkId.avalancheTestnet;

  useEffect(() => {
    if (isAvalancheChain) {
      dispatch(AvalancheActions.fetchStakerStats());
    } else {
      dispatch(AvalancheActions.fetchClaimStats());
    }
  }, [dispatch, isAvalancheChain]);

  const { data: stakerStats } = useQuery<IStakerStats | null>({
    type: AvalancheActions.fetchStakerStats.toString(),
  });

  const totalStaked = stakerStats?.history.length
    ? stakerStats.history.reduce((acc, item) => {
        const amount =
          item.transactionType === 'Stake' ? item.stakingAmount : bnZero;
        return amount.plus(acc);
      }, bnZero)
    : bnZero;

  return (
    <section className={classes.root}>
      <Curtains>
        <Box mb={4}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs="auto">
              <Typography variant="h4">
                {t('stake-avax.dashboard.avax-staking')}
              </Typography>
            </Grid>

            <Grid item xs={12} sm>
              <Timer />
            </Grid>
          </Grid>
        </Box>

        {step === StakingStep.Stake && isAvalancheChain && (
          <Queries
            requestActions={[AvalancheActions.fetchTransactionStatus]}
            showLoaderDuringRefetch={false}
          >
            {() => (
              <div className={classes.stats}>
                <Claim />
                <Balance />
              </div>
            )}
          </Queries>
        )}

        {step === StakingStep.Stake && !isAvalancheChain && (
          <QueryLoadingCentered />
        )}

        {step === StakingStep.WithdrawalAAvaxB && <FinishClaim />}

        {step === StakingStep.HoldExternalWallet && <Convert />}

        {isAvalancheChain && stakerStats && stakerStats.history.length > 0 && (
          <div className={classes.history}>
            <div className={classes.historyHeader}>
              <div className={classes.historyTitle}>
                {t('stake-avax.dashboard.staking-history')}
              </div>
              <div className={classes.historyTotal}>
                {t('stake-avax.dashboard.total-staked', {
                  value: totalStaked.toFormat(),
                })}
              </div>
            </div>
            <HistoryTable data={stakerStats.history} />
          </div>
        )}
      </Curtains>
    </section>
  );
};
