import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BlockchainNetworkId } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';
import { Queries } from '../../../../components/Queries/Queries';
import { ResponseData } from '../../../../components/ResponseData';
import { Spinner } from '../../../../components/Spinner';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { Curtains } from '../../../../UiKit/Curtains';
import { StakingStep } from '../../../avalanche-sdk/types';
import { useQueryParams } from '../../hooks/useQueryParams';
import { Balance } from '../Balance';
import { Claim } from '../Claim';
import { Convert } from '../Convert';
import { DashboardAPY } from '../DashboardAPY';
import { StakeDialog } from '../StakeDialog';
import { Timer } from '../Timer';
import { ReactComponent as PlusIcon } from './assets/plus.svg';
import { useDashboardStyles as useStakeAvaxDashboardComponentStyles } from './DashboardStyles';

export interface IDashboardProps {
  requiredNetwork: BlockchainNetworkId;
  step: StakingStep;
}

export const Dashboard = ({ requiredNetwork, step }: IDashboardProps) => {
  const classes = useStakeAvaxDashboardComponentStyles();
  const dispatch = useDispatch();
  const queryParams = useQueryParams();
  const amount = queryParams.get('amount');

  const isAvalancheChain =
    requiredNetwork === BlockchainNetworkId.avalanche ||
    requiredNetwork === BlockchainNetworkId.avalancheTestnet;

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

  const handleWithdrawSuccess = useCallback(() => {
    dispatch(AvalancheActions.fetchClaimStats());
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

            {step === StakingStep.Stake && (
              <>
                <Grid item xs={12} sm className={classes.timerCol}>
                  <Timer />
                </Grid>

                <Grid item xs sm={12} className={classes.apyCol}>
                  <DashboardAPY />
                </Grid>

                <Grid item xs={12} sm="auto">
                  <Queries<
                    ResponseData<typeof AvalancheActions.fetchStakerStats>
                  >
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
              </>
            )}
          </Grid>
        </Box>

        <Box display="flex" flexDirection="column">
          {step === StakingStep.Stake ? (
            <Queries<ResponseData<typeof AvalancheActions.fetchStakerStats>>
              requestActions={[AvalancheActions.fetchStakerStats]}
              showLoaderDuringRefetch={false}
            >
              {response => {
                if (!response) {
                  return null;
                }

                const { data } = response;

                return (
                  <div className={classes.stats}>
                    {data.claimAvailable && (
                      <Claim amount={data.claimAvailable} />
                    )}

                    <Balance amount={data.balance} />
                  </div>
                );
              }}
            </Queries>
          ) : null}

          {step === StakingStep.WithdrawalAAvaxB && (
            <Convert
              network={requiredNetwork}
              amount={amount ? new BigNumber(amount) : undefined}
              onSuccess={handleWithdrawSuccess}
              isClaimAvailable
            />
          )}

          {step === StakingStep.HoldExternalWallet ? (
            <Queries<ResponseData<typeof AvalancheActions.fetchClaimStats>>
              requestActions={[AvalancheActions.fetchClaimStats]}
              showLoaderDuringRefetch={true}
            >
              {response => {
                if (!response) {
                  return null;
                }

                const { data } = response;

                return (
                  data && (
                    <Convert
                      network={requiredNetwork}
                      amount={data.balance}
                      onSuccess={handleWithdrawSuccess}
                      isClaimAvailable={false}
                    />
                  )
                );
              }}
            </Queries>
          ) : null}
        </Box>
      </Curtains>
    </section>
  );
};
