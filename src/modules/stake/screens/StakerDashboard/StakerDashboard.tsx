import React, { useEffect } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { useStakerDasboardStyles } from './StakerDashboardStyles';
import { t, tHTML } from '../../../../common/utils/intl';
import { NavLink } from '../../../../UiKit/NavLink';
import { STAKER_STAKE_PATH } from '../../../../common/const';
import { Mutation, Query } from '@redux-requests/react';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoadingCentered } from '../../../../components/QueryLoading/QueryLoading';
import { QueryEmpty } from '../../../../components/QueryEmpty/QueryEmpty';
import { useDispatch } from 'react-redux';
import { IStakerStats } from '../../../../store/apiMappers/stakerStatsApi';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import { Button, Typography } from '@material-ui/core';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { Body1 } from '../../../../UiKit/Typography';
import { useIsXSDown } from '../../../../common/hooks/useTheme';
import classNames from 'classnames';
import { HistoryTable } from './components/HistoryTable';

const ENABLE_REDEEM = false;

export const StakerDashboardComponent = () => {
  const classes = useStakerDasboardStyles();
  const dispatch = useDispatch();

  const handleClaim = () => {
    dispatch(UserActions.claimAeth());
  };

  const handleUnstake = () => {
    dispatch(UserActions.unstake());
  };

  const isXSDown = useIsXSDown();

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        <Query<IStakerStats | null>
          type={UserActionTypes.FETCH_STAKER_STATS}
          errorComponent={QueryError}
          loadingComponent={QueryLoadingCentered}
          noDataMessage={<QueryEmpty />}
          showLoaderDuringRefetch={false}
        >
          {({ data }) => (
            <>
              <div className={classes.content}>
                <Typography className={classes.balance} color="primary">
                  {t('staked-dashboard.staked')}
                  {data?.staked && (
                    <span className={classes.value}>
                      {tHTML('units.large-eth', {
                        value: data.staked.toFormat(),
                      })}
                    </span>
                  )}
                </Typography>
                <NavLink
                  className={classes.primaryAction}
                  variant="outlined"
                  color="primary"
                  size={isXSDown ? 'medium' : 'large'}
                  href={STAKER_STAKE_PATH}
                >
                  {t('staked-dashboard.stake-more')}
                </NavLink>
                <MutationErrorHandler type={UserActionTypes.UNSTAKE} />
                <Mutation type={UserActionTypes.UNSTAKE}>
                  {({ loading }) => (
                    <Button
                      className={classNames(classes.action, classes.unstake)}
                      size={isXSDown ? 'small' : 'large'}
                      onClick={handleUnstake}
                      disabled={loading}
                      variant="text"
                      color="secondary"
                    >
                      {t('staker-dashboard.unstake')}
                    </Button>
                  )}
                </Mutation>
              </div>
              <div className={classes.content}>
                <Typography
                  className={classes.balance}
                  color={!ENABLE_REDEEM && 'secondary'}
                >
                  {t('staked-dashboard.current-a-eth-balance')}
                  {data?.aEthBalance && (
                    <span className={classes.value}>
                      {tHTML('units.large-aeth', {
                        value: data.aEthBalance.toFormat(),
                      })}
                    </span>
                  )}
                </Typography>
                <MutationErrorHandler type={UserActionTypes.CLAIM_A_ETH} />
                <Mutation type={UserActionTypes.CLAIM_A_ETH}>
                  {({ loading }) => (
                    <Button
                      className={classes.primaryAction}
                      size={isXSDown ? 'medium' : 'large'}
                      color="secondary"
                      variant="outlined"
                      onClick={handleClaim}
                      disabled={loading || !ENABLE_REDEEM}
                    >
                      {t('staked-dashboard.redeem')}
                    </Button>
                  )}
                </Mutation>
                <Body1
                  classes={{ root: classes.note }}
                  component="p"
                  color="primary"
                >
                  {t('staked-dashboard.locked')}
                </Body1>
              </div>
              {data && data.stakes.length > 0 && (
                <HistoryTable className={classes.history} data={data.stakes} />
              )}
            </>
          )}
        </Query>
      </Curtains>
    </section>
  );
};

export const StakerDashboard = () => {
  const dispatch = useDispatch();
  const { isConnected } = useAuthentication();

  useEffect(() => {
    if (isConnected) {
      dispatch(UserActions.fetchStakerStats());
    }
  }, [dispatch, isConnected]);

  return <StakerDashboardComponent />;
};
