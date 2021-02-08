import React, { useEffect } from 'react';
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
import { QueryLoadingAbsolute } from '../../../../components/QueryLoading/QueryLoading';
import { QueryEmpty } from '../../../../components/QueryEmpty/QueryEmpty';
import { useDispatch } from 'react-redux';
import { IStakerStats } from '../../../../store/apiMappers/stakerStatsApi';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import {
  Box,
  Button,
  ButtonGroup,
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
import BigNumber from 'bignumber.js';
import { ReactComponent as PendingIcon } from './assets/pending.svg';
import { getStakedAmount } from '../../../../common/utils/getStakedAmount';
import { getPendingAmount } from '../../../../common/utils/getPendingAmount';

const DECIMAL_PLACES = 4;

function AETHBalance({
  totalAEth,
  data,
  onClaim,
  totalAEthToEthPrice,
}: {
  totalAEth: BigNumber;
  data: IStakerStats;
  onClaim: () => void;
  totalAEthToEthPrice: BigNumber;
}) {
  const classes = useStakerDashboardStyles();
  const ENABLE_REDEEM = data?.aEthClaimableBalance.isGreaterThan(0);
  return (
    <>
      <Box mt="auto">
        <Box fontSize={13} color="text.secondary" fontWeight={500}>
          {!totalAEthToEthPrice.isZero() &&
            t('unit.~eth-value', {
              value: totalAEthToEthPrice.decimalPlaces(DECIMAL_PLACES),
            })}
        </Box>
        <Box className={classes.amount}>
          {tHTML('unit.separated-aeth-value', {
            value: totalAEth.decimalPlaces(DECIMAL_PLACES),
          })}
        </Box>
      </Box>
      <Hidden mdUp={true}>
        <Box mt={1.5} mb={1.5}>
          <Divider />
        </Box>
      </Hidden>
      <div className={classes.aETHRow}>
        <Box>
          <Box
            mb={1.5}
            fontSize={16}
            fontWeight={500}
            color="text.secondary"
            whiteSpace="no-wrap"
          >
            {t('staker-dashboard.on-stkr')}
          </Box>
          <Box display="flex" alignItems="center" mb={{ xs: 3.5, md: 0 }}>
            <Typography variant="h5" noWrap={true}>
              {t('unit.aeth-value', {
                value: data.aEthClaimableBalance.decimalPlaces(DECIMAL_PLACES),
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
                    className={classes.claim}
                  >
                    {t('staker-dashboard.claim')}
                  </Button>
                )}
              </Mutation>
            </Box>
          </Box>
        </Box>
        <Hidden smDown={true}>
          <Box ml={5} mr={5} height={63}>
            <Divider orientation="vertical" />
          </Box>
        </Hidden>
        <Box>
          <Box
            mb={1.5}
            fontSize={16}
            fontWeight={500}
            color="text.secondary"
            whiteSpace="nowrap"
          >
            {t('staker-dashboard.on-wallet')}
          </Box>
          <Typography
            variant="h5"
            color={
              data.aEthBalance.isLessThanOrEqualTo(0)
                ? 'textSecondary'
                : undefined
            }
          >
            {t('unit.aeth-value', {
              value: data.aEthBalance.decimalPlaces(DECIMAL_PLACES),
            })}
          </Typography>
        </Box>
      </div>
    </>
  );
}

export const StakerDashboardComponent = () => {
  const classes = useStakerDashboardStyles();
  const dispatch = useDispatch();

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
          loadingComponent={QueryLoadingAbsolute}
          noDataMessage={<QueryEmpty />}
          showLoaderDuringRefetch={false}
        >
          {({ data }) => {
            if (!data) {
              return null;
            }

            const totalAEth = data.aEthClaimableBalance.plus(data.aEthBalance);
            let totalAEthToEthPrice = totalAEth.div(data.aEthRatio);
            if (data.aEthRatio.isZero()) {
              totalAEthToEthPrice = new BigNumber('0');
            }

            const staked = getStakedAmount(data.stakes);
            const pending = getPendingAmount(data.stakes, staked);

            return (
              <>
                <Paper
                  variant="outlined"
                  square={false}
                  className={classes.stakedContent}
                >
                  <Box fontSize={{ xs: 18, md: 20 }} fontWeight={500}>
                    {t('staked-dashboard.staked')}
                  </Box>
                  <MutationErrorHandler type={UserActionTypes.UNSTAKE} />
                  {pending.isGreaterThan(0) ? (
                    <Mutation type={UserActionTypes.UNSTAKE}>
                      {({ loading }) => (
                        <ButtonGroup className={classes.buttonGroup}>
                          {pending.isGreaterThan(0) && (
                            <Button
                              size="small"
                              variant="contained"
                              color="secondary"
                              disableElevation
                              className={classes.pending}
                            >
                              <PendingIcon className={classes.pendingIcon} />
                              {t('staker-dashboard.pending', {
                                value: pending.toFormat(),
                              })}
                            </Button>
                          )}
                          <Button
                            size="small"
                            onClick={handleUnstake}
                            disabled={loading}
                            variant="contained"
                            color="secondary"
                            disableElevation
                          >
                            {t('staker-dashboard.unstake')}
                          </Button>
                        </ButtonGroup>
                      )}
                    </Mutation>
                  ) : (
                    <div />
                  )}
                  <Box mt="auto" className={classes.amount}>
                    {tHTML('unit.separated-eth-value', {
                      value: staked.decimalPlaces(DECIMAL_PLACES),
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
                  <Box
                    fontSize={{ xs: 18, md: 20 }}
                    fontWeight={500}
                    mb={{ md: 1.5 }}
                  >
                    {t('staked-dashboard.current-a-eth-balance')}
                  </Box>
                  <Box
                    fontSize={13}
                    fontWeight={500}
                    color="text.secondary"
                    ml={{ md: 'auto' }}
                    mb={{ xs: 6, md: undefined }}
                  >
                    {t('staker-dashboard.aeth-price', {
                      value: new BigNumber(1)
                        .div(data.aEthRatio)
                        .decimalPlaces(DECIMAL_PLACES),
                    })}
                  </Box>
                  <AETHBalance
                    totalAEth={totalAEth}
                    data={data}
                    onClaim={handleClaim}
                    totalAEthToEthPrice={totalAEthToEthPrice}
                  />
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
