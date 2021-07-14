import React, { useCallback, useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useDashboardStyles as useStakeAvaxDashboardComponentStyles } from './DashboardStyles';
import { Balance } from '../Balance';
import { Claim } from '../Claim';
import { Box, Button, Typography } from '@material-ui/core';
import { t } from '../../../../common/utils/intl';
import { ReactComponent as PlusIcon } from './assets/plus.svg';
import { StakeDialog } from '../StakeDialog';
import { Convert } from '../Convert';
import { Connect } from '../Connect';
import { IStakerStats, IWalletStatus } from '../../../avalanche-sdk/types';
import { Query, useMutation, useQuery } from '@redux-requests/react';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { QueryEmpty } from '../../../../components/QueryEmpty/QueryEmpty';
import { useDispatch } from 'react-redux';
import { Spinner } from '../../../../components/Spinner';
import { configFromEnv } from '../../../api/config';
import { Body2 } from '../../../../UiKit/Typography';

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

  const { data: stakerStats } = useQuery<IStakerStats | null>({
    type: AvalancheActions.fetchStakerStats.toString(),
  });

  useEffect(() => {
    if (requiredNetwork !== `${config.providerConfig.avalancheChainId}`) {
      dispatch(AvalancheActions.fetchClaimStats());
    } else {
      dispatch(AvalancheActions.fetchStakerStats());
      dispatch(AvalancheActions.fetchEstimatedAPY());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredNetwork, dispatch]);

  const handleStakeSuccess = useCallback(() => {
    dispatch(AvalancheActions.fetchStakerStats());
  }, [dispatch]);

  const handleWithdrawSuccess = useCallback(() => {
    dispatch(AvalancheActions.fetchClaimStats());
  }, [dispatch]);

  return (
    <section className={classes.root}>
      <Box>
        <Box className={classes.header}>
          <Typography variant="h2">
            {t('stake-avax.dashboard.avax-staking')}
          </Typography>
          {requiredNetwork === String(config.providerConfig.avalancheChainId) &&
            stakerStats?.balance && (
              <StakeDialog
                amount={stakerStats.balance}
                onSuccess={handleStakeSuccess}
              >
                <Button
                  size="large"
                  color="secondary"
                  variant="outlined"
                  className={classes.buttonStake}
                >
                  <PlusIcon />
                  {stakingInProgress ? (
                    <Spinner size={32} />
                  ) : (
                    t('stake-avax.dashboard.stake-avax')
                  )}
                </Button>
              </StakeDialog>
            )}
        </Box>
        <Query<BigNumber>
          type={AvalancheActions.fetchEstimatedAPY.toString()}
          errorComponent={QueryError}
          loadingComponent={QueryLoading}
          noDataMessage={<QueryEmpty />}
          showLoaderDuringRefetch={false}
        >
          {({ data }) => (
            <Body2 color="textSecondary">
              {t('stake-avax.dashboard.apy', {
                value: data.decimalPlaces(2).toFormat(),
              })}
            </Body2>
          )}
        </Query>
      </Box>
      {!isConnected && (
        <Connect
          network={requiredNetwork}
          amount={amount}
          recipient={recipient}
        />
      )}
      {isConnected && (
        <Box display="flex" flexDirection="column">
          {requiredNetwork ===
          String(config.providerConfig.avalancheChainId) ? (
            <Query<IStakerStats | null>
              type={AvalancheActions.fetchStakerStats.toString()}
              errorComponent={QueryError}
              loadingComponent={QueryLoading}
              noDataMessage={<QueryEmpty />}
              showLoaderDuringRefetch={true}
            >
              {({ data }) => {
                return (
                  data && (
                    <div className={classes.stats}>
                      {data.claimAvailable && (
                        <Claim amount={data.claimAvailable} />
                      )}
                      <Balance amount={data.balance} />
                    </div>
                  )
                );
              }}
            </Query>
          ) : (
            <Query<IStakerStats | null>
              type={AvalancheActions.fetchClaimStats.toString()}
              errorComponent={QueryError}
              loadingComponent={QueryLoading}
              noDataMessage={<QueryEmpty />}
              showLoaderDuringRefetch={true}
            >
              {({ data }) => {
                return (
                  data && (
                    <Convert
                      network={requiredNetwork}
                      amount={data.balance}
                      onSuccess={handleWithdrawSuccess}
                    />
                  )
                );
              }}
            </Query>
          )}
        </Box>
      )}
    </section>
  );
};
