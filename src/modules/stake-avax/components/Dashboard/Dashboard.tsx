import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMutation } from '@redux-requests/react';
import classNames from 'classnames';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BlockchainNetworkId } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';
import { Queries } from '../../../../components/Queries/Queries';
import { QueryLoadingCentered } from '../../../../components/QueryLoading/QueryLoading';
import { ResponseData } from '../../../../components/ResponseData';
import { Spinner } from '../../../../components/Spinner';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { selectUserChainId } from '../../../../store/reducers/userReducer';
import { Curtains } from '../../../../UiKit/Curtains';
import { StakingStep } from '../../api/types';
import { Balance } from '../Balance';
import { Claim } from '../Claim';
import { Convert } from '../Convert';
import { DashboardAPY } from '../DashboardAPY';
import { FinishClaim } from '../FinishClaim';
import { StakeDialog } from '../StakeDialog';
import { Timer } from '../Timer';
import { ReactComponent as PlusIcon } from './assets/plus.svg';
import { useDashboardStyles } from './DashboardStyles';

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

  const { loading: stakeLoading } = useMutation({
    type: AvalancheActions.stake.toString(),
  });

  useEffect(() => {
    if (isAvalancheChain) {
      dispatch(AvalancheActions.fetchStakerStats());
    } else {
      dispatch(AvalancheActions.fetchClaimStats());
    }
  }, [dispatch, isAvalancheChain]);

  const handleStakeSuccess = useCallback(() => {
    dispatch(AvalancheActions.fetchStakerStats());
  }, [dispatch]);

  return (
    <section className={classes.root}>
      <Curtains>
        <Box mb={{ xs: 4, sm: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs="auto">
              <Typography variant="h4">
                {t('stake-avax.dashboard.avax-staking')}
              </Typography>
            </Grid>

            <Grid item xs={12} sm className={classes.timerCol}>
              <Timer />
            </Grid>

            <Grid item xs sm={12} className={classes.apyCol}>
              <DashboardAPY />
            </Grid>

            {step === StakingStep.Stake && (
              <Grid item xs={12} sm="auto">
                <Queries<ResponseData<typeof AvalancheActions.fetchStakerStats>>
                  requestActions={[AvalancheActions.fetchStakerStats]}
                  showLoaderDuringRefetch={false}
                  noDataMessage={
                    <Skeleton
                      variant="rect"
                      className={classNames(
                        classes.buttonStakeSkeleton,
                        classes.buttonStake,
                      )}
                    />
                  }
                >
                  {response => {
                    if (!response) {
                      return null;
                    }

                    const { data: stakerStats } = response;

                    return (
                      <StakeDialog
                        amount={stakerStats.balance}
                        onSuccess={handleStakeSuccess}
                      >
                        <Button
                          size="large"
                          color="secondary"
                          variant="outlined"
                          className={classes.buttonStake}
                          startIcon={stakeLoading ? undefined : <PlusIcon />}
                          fullWidth
                        >
                          {stakeLoading ? (
                            <Spinner size={32} />
                          ) : (
                            t('stake-avax.dashboard.stake-avax')
                          )}
                        </Button>
                      </StakeDialog>
                    );
                  }}
                </Queries>
              </Grid>
            )}
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
