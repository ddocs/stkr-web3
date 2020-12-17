import React, { useCallback, useEffect, useState } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { useStakerDashboardStyles } from './StakerDashboardStyles';
import { t, tHTML } from '../../../../common/utils/intl';
import { STAKER_STAKE_PATH } from '../../../../common/const';
import { Mutation, Query, useQuery } from '@redux-requests/react';
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
import {
  Box,
  Button,
  Divider,
  Hidden,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { HistoryTable } from './components/HistoryTable';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as PlusIcon } from './assets/plus.svg';
import { BalanceSwitcherMode, Switcher } from './components/Switcher/Switcher';
import BigNumber from 'bignumber.js';

const AMOUNT_FIXED_DECIMAL_PLACES = 2;
const RATE_FIXED_DECIMAL_PLACES = 4;

function AETHBalance({
  totalAEth,
  data,
  onClaim,
}: {
  totalAEth: BigNumber;
  data: IStakerStats;
  onClaim: () => void;
}) {
  const classes = useStakerDashboardStyles();
  const ENABLE_REDEEM = data?.aEthClaimableBalance.isGreaterThan(0);
  return (
    <>
      <Box mt="auto" className={classes.amount}>
        {tHTML('units.separated-aeth-value', {
          value: totalAEth.toFormat(AMOUNT_FIXED_DECIMAL_PLACES),
        })}
      </Box>
      <div className={classes.aETHRow}>
        <Box>
          <Box mb={1}>
            <Typography variant="body2">
              {t('staker-dashboard.on-stkr')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="h5" noWrap={true}>
              {t('units.aeth-value', {
                value: data.aEthClaimableBalance.toFormat(),
              })}
            </Typography>
            <Box ml={1}>
              <MutationErrorHandler type={UserActionTypes.CLAIM_A_ETH} />
              <Mutation type={UserActionTypes.CLAIM_A_ETH}>
                {({ loading }) => (
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={onClaim}
                    disabled={loading || !ENABLE_REDEEM}
                  >
                    {t('staker-dashboard.claim')}
                  </Button>
                )}
              </Mutation>
            </Box>
          </Box>
        </Box>
        <Hidden xsDown={true}>
          <Box ml={2} mr={2} height={63}>
            <Divider orientation="vertical" />
          </Box>
        </Hidden>
        <Box>
          <Box mb={1.5}>
            <Typography variant="body2" noWrap={true}>
              {t('staker-dashboard.on-wallet')}
            </Typography>
          </Box>
          <Typography variant="h5">
            {tHTML('units.number-value', {
              value: data.aEthBalance.toFormat(),
            })}
          </Typography>
        </Box>
      </div>
    </>
  );
}

function ETHBalance({
  totalAEthPrice,
  totalAEth,
  data,
}: {
  totalAEthPrice: BigNumber;
  totalAEth: BigNumber;
  data: IStakerStats;
}) {
  const classes = useStakerDashboardStyles();
  return (
    <>
      <Box
        mt="auto"
        display="grid"
        gridTemplateColumns="1fr 2fr"
        gridTemplateRows="1fr 1fr"
        gridColumnGap={24}
      >
        <Box gridColumn="1" gridRow="1 / 3" className={classes.amount}>
          {tHTML('units.separated-eth-value', {
            value: totalAEthPrice.toFormat(AMOUNT_FIXED_DECIMAL_PLACES),
          })}
        </Box>
        <Box gridColumn="2" gridRow="1" pt={1.5}>
          <Typography variant="body2">
            {t('staker-dashboard.profit')}
          </Typography>
        </Box>
        <Box gridColumn="2" gridRow="2" pt={0.5}>
          <Typography variant="h5" color="primary">
            {t('units.eth-value', {
              value: totalAEth
                .div(data.aEthRatio)
                .minus(data.staked)
                .toFixed(AMOUNT_FIXED_DECIMAL_PLACES),
            })}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" mt="auto" pb={2} maxWidth={200}>
        <Box mr={1.5}>
          <Divider
            orientation="vertical"
            light={true}
            className={classes.noteDivider}
          />
        </Box>
        {t('staker-dashboard.notice')}
      </Box>
    </>
  );
}

export const StakerDashboardComponent = () => {
  const classes = useStakerDashboardStyles();
  const dispatch = useDispatch();
  const [balanceMode, setBalanceMode] = useState<BalanceSwitcherMode>(
    BalanceSwitcherMode.aETH,
  );

  const handleSetBalanceMode = useCallback((mode: BalanceSwitcherMode) => {
    setBalanceMode(mode);
  }, []);

  const handleClaim = () => {
    dispatch(UserActions.claimAeth());
  };

  const handleUnstake = () => {
    dispatch(UserActions.unstake());
  };

  return (
    <section className={classes.root}>
      <Curtains classes={{ root: classes.content }}>
        <Query<IStakerStats | null>
          type={UserActionTypes.FETCH_STAKER_STATS}
          errorComponent={QueryError}
          loadingComponent={QueryLoadingCentered}
          noDataMessage={<QueryEmpty />}
          showLoaderDuringRefetch={false}
        >
          {({ data }) => {
            if (!data) {
              return null;
            }

            const totalAEth = data.aEthClaimableBalance.plus(data.aEthBalance);
            const totalAEthPrice = totalAEth?.div(data.aEthRatio);

            return (
              <>
                <Paper
                  variant="outlined"
                  square={false}
                  className={classes.stakedContent}
                >
                  <Box fontSize={20} fontWeight={500}>
                    {t('staked-dashboard.staked')}
                  </Box>
                  <MutationErrorHandler type={UserActionTypes.UNSTAKE} />
                  {data.staked.isGreaterThan(0) ? (
                    <Mutation type={UserActionTypes.UNSTAKE}>
                      {({ loading }) => (
                        <Button
                          size="small"
                          onClick={handleUnstake}
                          disabled={loading}
                          variant="contained"
                          color="secondary"
                          className={classes.unstakeButton}
                        >
                          {t('staker-dashboard.unstake')}
                        </Button>
                      )}
                    </Mutation>
                  ) : (
                    <div />
                  )}
                  <Box mt="auto" className={classes.amount}>
                    {tHTML('units.separated-eth-value', {
                      value: data.staked.toFormat(),
                    })}
                  </Box>
                  <Box mt="auto" justifySelf="end">
                    <RouterLink to={STAKER_STAKE_PATH}>
                      <IconButton
                        className={classes.stake}
                        title={t('staked-dashboard.stake-more')}
                      >
                        <PlusIcon />
                      </IconButton>
                    </RouterLink>
                  </Box>
                </Paper>
                <Paper
                  variant="outlined"
                  square={false}
                  className={classes.earningContent}
                >
                  <Box>
                    <Box fontSize={20} fontWeight={500} mb={1.5}>
                      {t('staked-dashboard.current-a-eth-balance')}
                    </Box>
                    <Box fontSize={13} fontWeight={500} color="text.secondary">
                      {t('staker-dashboard.aeth-price', {
                        value: new BigNumber(1)
                          .div(data.aEthRatio.toFormat())
                          .toFixed(RATE_FIXED_DECIMAL_PLACES),
                      })}
                    </Box>
                  </Box>
                  <Switcher
                    onSetBalanceMode={handleSetBalanceMode}
                    value={balanceMode}
                  />
                  {balanceMode === BalanceSwitcherMode.aETH ? (
                    <AETHBalance
                      totalAEth={totalAEth}
                      data={data}
                      onClaim={handleClaim}
                    />
                  ) : (
                    <ETHBalance
                      totalAEthPrice={totalAEthPrice}
                      totalAEth={totalAEth}
                      data={data}
                    />
                  )}
                </Paper>
                {data.stakes.length > 0 && (
                  <HistoryTable
                    classes={{ root: classes.history }}
                    data={data.stakes}
                  />
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
