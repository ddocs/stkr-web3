import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Query, useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '../../../../common/utils/intl';
import { QueryEmpty } from '../../../../components/QueryEmpty/QueryEmpty';
import { QueryError } from '../../../../components/QueryError/QueryError';
import {
  QueryLoading,
  QueryLoadingCentered,
} from '../../../../components/QueryLoading/QueryLoading';
import { Spinner } from '../../../../components/Spinner';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { Curtains } from '../../../../UiKit/Curtains';
import { configFromEnv } from '../../../api/config';
import { IStakerStats, IWalletStatus } from '../../../avalanche-sdk/types';
import { Balance } from '../Balance';
import { Claim } from '../Claim';
import { Connect } from '../Connect';
import { Convert } from '../Convert';
import { StakeDialog } from '../StakeDialog';
import { ReactComponent as PlusIcon } from './assets/plus.svg';
import { useDashboardStyles as useStakeAvaxDashboardComponentStyles } from './DashboardStyles';

export interface IDashboardProps {
  wallet: IWalletStatus;
}

export const Dashboard = ({
  wallet: { requiredNetwork, isConnected, amount, recipient },
}: IDashboardProps) => {
  const classes = useStakeAvaxDashboardComponentStyles();
  const dispatch = useDispatch();
  const config = useMemo(() => configFromEnv(), []);
  const { loading: stakingInProgress } = useMutation({
    type: AvalancheActions.stake.toString(),
  });

  const {
    data: stakerStats,
    loading: stakerStatsLoading,
  } = useQuery<IStakerStats | null>({
    type: AvalancheActions.fetchStakerStats.toString(),
  });

  const isAvalancheChain =
    requiredNetwork === `${config.providerConfig.avalancheChainId}`;

  useEffect(() => {
    if (!isAvalancheChain) {
      dispatch(AvalancheActions.fetchClaimStats());
    } else {
      dispatch(AvalancheActions.fetchStakerStats());
      dispatch(AvalancheActions.fetchEstimatedAPY());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleStakeSuccess = useCallback(() => {
    dispatch(AvalancheActions.fetchStakerStats());
  }, [dispatch]);

  const handleWithdrawSuccess = useCallback(() => {
    dispatch(AvalancheActions.fetchClaimStats());
  }, [dispatch]);

  return (
    <section className={classes.root}>
      <Curtains>
        <Box mb={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs="auto">
              <Typography variant="h4">
                {t('stake-avax.dashboard.avax-staking')}
              </Typography>
            </Grid>

            <Grid item xs sm={12} className={classes.apyCol}>
              <Query<BigNumber>
                type={AvalancheActions.fetchEstimatedAPY.toString()}
                errorComponent={QueryError}
                loadingComponent={() => (
                  <Typography variant="body2" className={classes.apyValue}>
                    <Skeleton width={80} />
                  </Typography>
                )}
                noDataMessage={<QueryEmpty />}
                showLoaderDuringRefetch={false}
              >
                {({ data }) => (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.apyValue}
                  >
                    {t('stake-avax.dashboard.apy', {
                      value: data.decimalPlaces(2).toFormat(),
                    })}
                  </Typography>
                )}
              </Query>
            </Grid>

            <Grid item xs={12} sm="auto">
              {isAvalancheChain && stakerStats?.balance && !stakerStatsLoading && (
                <StakeDialog
                  amount={stakerStats.balance}
                  onSuccess={handleStakeSuccess}
                >
                  <Button
                    size="large"
                    color="secondary"
                    variant="outlined"
                    className={classes.buttonStake}
                    startIcon={<PlusIcon />}
                    fullWidth
                  >
                    {stakingInProgress ? (
                      <Spinner size={32} />
                    ) : (
                      t('stake-avax.dashboard.stake-avax')
                    )}
                  </Button>
                </StakeDialog>
              )}
              {isAvalancheChain && stakerStatsLoading && (
                <Skeleton
                  variant="rect"
                  className={classNames(
                    classes.buttonStake,
                    classes.buttonStakeSkeleton,
                  )}
                />
              )}
            </Grid>
          </Grid>
        </Box>

        {!isConnected && (
          <Connect
            network={requiredNetwork}
            amount={amount}
            recipient={recipient}
          />
        )}

        {isConnected && isAvalancheChain && (
          <Query<IStakerStats | null>
            type={AvalancheActions.fetchStakerStats.toString()}
            errorComponent={QueryError}
            loadingComponent={QueryLoadingCentered}
            noDataMessage={<QueryEmpty />}
            showLoaderDuringRefetch={true}
          >
            {({ data }) =>
              data && (
                <div className={classes.stats}>
                  {data.claimAvailable && (
                    <Claim amount={data.claimAvailable} />
                  )}

                  <Balance amount={data.balance} />
                </div>
              )
            }
          </Query>
        )}

        {isConnected && !isAvalancheChain && (
          <Query<IStakerStats | null>
            type={AvalancheActions.fetchClaimStats.toString()}
            errorComponent={QueryError}
            loadingComponent={QueryLoading}
            noDataMessage={<QueryEmpty />}
            showLoaderDuringRefetch={true}
          >
            {({ data }) =>
              data && (
                <Convert
                  network={requiredNetwork}
                  amount={data.balance}
                  onSuccess={handleWithdrawSuccess}
                />
              )
            }
          </Query>
        )}
      </Curtains>
    </section>
  );
};
