import React, { useEffect } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { useStakerDashboardStyles } from './StakerDashboardStyles';
import { Query, useQuery } from '@redux-requests/react';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoadingAbsolute } from '../../../../components/QueryLoading/QueryLoading';
import { QueryEmpty } from '../../../../components/QueryEmpty/QueryEmpty';
import { useDispatch } from 'react-redux';
import {
  IStakerStats,
  IStakingHistory,
} from '../../../../store/apiMappers/stakerStatsApi';
import { HistoryTable } from './components/HistoryTable';
import { getStakedAmount } from '../../../../common/utils/getStakedAmount';
import { getPendingAmount } from '../../../../common/utils/getPendingAmount';
import { Balance } from './components/Balance';
import { StakerDashboardTotalPanel } from './components/StakerDashboardTotalPanel/StakerDashboardTotalPanel';
import { t } from '../../../../common/utils/intl';
import { StakerDashboardStakingLabel } from './components/StakingLabel/StakerDashboardStakingLabel';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import BigNumber from 'bignumber.js';
import { useIsMDDown } from '../../../../common/hooks/useTheme';
import { useFeaturesAvailable } from '../../../../common/hooks/useFeaturesAvailable';
import { SwitchNetworkNotification } from './components/SwitchNetworkNotification/SwitchNetworkNotification';
import { Box } from '@material-ui/core';

const ONE = new BigNumber(1);

export const StakerDashboardComponent = () => {
  const classes = useStakerDashboardStyles();
  const dispatch = useDispatch();
  const isMDDown = useIsMDDown();

  const handleUnstake = () => {
    dispatch(UserActions.unstake());
  };

  const { isClaimAvailable } = useFeaturesAvailable();

  const { data: stakingHistory } = useQuery<IStakingHistory | null>({
    type: UserActionTypes.FETCH_STAKING_HISTORY,
  });

  return (
    <section className={classes.root}>
      <Curtains classes={{ root: classes.content }}>
        <Query<IStakerStats | null>
          type={UserActionTypes.FETCH_STAKER_STATS}
          errorComponent={QueryError}
          loadingComponent={QueryLoadingAbsolute}
          noDataMessage={<QueryEmpty />}
          showLoaderDuringRefetch={false}
        >
          {({ data }) => {
            if (!data) {
              return null;
            }

            const pending = getPendingAmount(
              stakingHistory?.stakes || [],
              getStakedAmount(stakingHistory?.stakes || []),
            );

            const aEthPrice = data.aEthRatio.isGreaterThan(0)
              ? new BigNumber(1).div(data.aEthRatio)
              : undefined;

            return (
              <>
                <div className={classes.title}>
                  <span>{t('staker-dashboard.title')}</span>
                  {!isMDDown && isClaimAvailable && (
                    <StakerDashboardStakingLabel
                      pending={pending}
                      onUnstake={handleUnstake}
                    />
                  )}
                </div>

                <Box
                  gridTemplateColumns={
                    isClaimAvailable ? '1fr 1fr 1fr' : '1fr 2fr'
                  }
                  className={classes.boxes}
                >
                  <StakerDashboardTotalPanel
                    claimableFETHRewardOf={data.claimableFETHRewardOf}
                    claimableAETHRewardOf={data.claimableAETHRewardOf}
                    isClaimAvailable={isClaimAvailable}
                  >
                    {isMDDown && isClaimAvailable ? (
                      <StakerDashboardStakingLabel
                        pending={pending}
                        onUnstake={handleUnstake}
                      />
                    ) : undefined}
                  </StakerDashboardTotalPanel>

                  {isClaimAvailable ? (
                    <>
                      <Balance
                        variant="aETH"
                        value={data.aEthBalance}
                        price={aEthPrice}
                      />
                      <Balance
                        variant="fETH"
                        value={data.fEthBalance}
                        price={ONE}
                      />
                    </>
                  ) : (
                    <SwitchNetworkNotification />
                  )}
                </Box>
                {stakingHistory ? (
                  <HistoryTable
                    classes={{ root: classes.history }}
                    data={stakingHistory.stakes}
                  />
                ) : (
                  <QueryLoadingAbsolute />
                )}
              </>
            );
          }}
        </Query>
      </Curtains>
    </section>
  );
};

export const StakerDashboard = () => {
  const dispatch = useDispatch();
  const { isConnected } = useAuthentication();
  const { pristine } = useQuery({ type: UserActionTypes.FETCH_STAKER_STATS });

  useEffect(() => {
    if (isConnected && pristine) {
      dispatch(UserActions.fetchStakerStats());
    }
  }, [dispatch, isConnected, pristine]);

  return <StakerDashboardComponent />;
};
