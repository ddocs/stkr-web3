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
import { StakingStep } from '../../api/types';
import { Balance } from '../Balance';
import { Claim } from '../Claim';
import { Convert } from '../Convert';
import { FinishClaim } from '../FinishClaim';
import { Timer } from '../Timer';
import { useDashboardStyles } from './DashboardStyles';
import { Label } from '../../../../components/Label';

export interface IDashboardProps {
  step: StakingStep;
}

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

  return (
    <section className={classes.root}>
      <Curtains>
        <Box mb={4}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs="auto" className={classes.title}>
              <Typography variant="h4">
                {t('stake-avax.dashboard.avax-staking')}
              </Typography>
              <Label title="Beta" className={classes.label} />
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
      </Curtains>
    </section>
  );
};
