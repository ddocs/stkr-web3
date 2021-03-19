import React, { useCallback, useState } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { useStakerDashboardBnbStyles } from './StakerDashboardBnbStyles';
import { t, tHTML } from '../../../../common/utils/intl';
import { getStakerBnbPath } from '../../../../common/const';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { PlusIcon } from '../../../../UiKit/Icons/PlusIcon';
import { BnbIcon } from '../../../../UiKit/Icons/BnbIcon';
import { HistoryTableBnb } from './components/HistoryTableBnb';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { IBnbStatsData, StakeBnbActions } from '../../actions/StakeBnbActions';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { Query, useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { QueryError } from '../../../../components/QueryError/QueryError';
import {
  QueryLoading,
  QueryLoadingAbsolute,
} from '../../../../components/QueryLoading/QueryLoading';
import { IGetStakingHistoryData } from '../../api/apiBinance';
import { BnbFetchStatsError } from '../../components/BnbFetchStatsError/BnbFetchStatsError';
import { useHistory, useParams } from 'react-router';

interface StakerDashboardBnbComponentProps {
  walletBalance: BigNumber;
  delegated: BigNumber;
  rewardsAmount: BigNumber;
  walletAccountId: string;
}

export const StakerDashboardBnbComponent = ({
  walletBalance,
  delegated,
  rewardsAmount,
  walletAccountId,
}: StakerDashboardBnbComponentProps) => {
  const classes = useStakerDashboardBnbStyles();
  const dispatch = useRequestDispatch();

  const handleUndelegate = useCallback(() => {
    dispatch(StakeBnbActions.undelegate(walletAccountId, delegated.toNumber()));
  }, [delegated, dispatch, walletAccountId]);

  const { loading } = useMutation({
    type: StakeBnbActions.undelegate.toString(),
  });

  return (
    <>
      <Paper variant="outlined" square={false} className={classes.stakeContent}>
        <Box fontSize={{ xs: 18, md: 20 }} fontWeight={500}>
          {t('staker-bnb-dashboard.stake.title')}
        </Box>
        <Box justifySelf="end">
          <RouterLink to={getStakerBnbPath(walletAccountId)}>
            <IconButton
              title={t('staker-bnb-dashboard.stake.add-button-title')}
              className={classes.stake}
            >
              <PlusIcon htmlColor="#fff" />
            </IconButton>
          </RouterLink>
        </Box>

        <Typography variant="h1" className={classes.amount}>
          {tHTML('staker-bnb-dashboard.amount', {
            value: delegated.toFormat(),
          })}
          <MutationErrorHandler type={StakeBnbActions.undelegate.toString()} />
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            className={classes.undelegate}
            onClick={handleUndelegate}
            disabled={loading}
          >
            {t('staker-bnb-dashboard.balance.undelegate')}
          </Button>
        </Typography>
      </Paper>
      <Paper variant="outlined" square={false} className={classes.balance}>
        <Box fontSize={{ xs: 18, md: 20 }} fontWeight={500}>
          <BnbIcon className={classes.headerIcon} />
          {t('staker-bnb-dashboard.balance.title')}
        </Box>
        <Box display="flex" mt="auto">
          <Box>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.title}
            >
              {t('staker-bnb-dashboard.balance.rewards')}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="h6">
                {tHTML('staker-bnb-dashboard.amount', {
                  value: rewardsAmount.toFormat(),
                })}
              </Typography>
            </Box>
          </Box>
          <Divider orientation="vertical" className={classes.divider} />
          <Box display="flex" flexDirection="column">
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.title}
            >
              {t('staker-bnb-dashboard.balance.on-wallet')}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {tHTML('staker-bnb-dashboard.amount', {
                value: walletBalance.toFormat(),
              })}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export const StakerDashboardBnb = () => {
  const dispatch = useRequestDispatch();
  const classes = useStakerDashboardBnbStyles();
  const { id: walletAccountId } = useParams<{ id: string }>();
  const [inited, setInited] = useState(false);
  const { goBack } = useHistory();

  useInitEffect(() => {
    dispatch(StakeBnbActions.fetchStats(walletAccountId));
    dispatch(StakeBnbActions.fetchStakingHistory(walletAccountId));
    setInited(true);
  });

  const handleCancel = useCallback(() => {
    goBack();
  }, [goBack]);

  const { error } = useQuery({
    type: StakeBnbActions.fetchStats.toString(),
  });

  if (!inited) {
    // Against blinking
    return null;
  }

  if (error) {
    return <BnbFetchStatsError error={error} onCancel={handleCancel} />;
  }

  return (
    <Box component="section" mt={8}>
      <Curtains classes={{ root: classes.content }}>
        <Query<IBnbStatsData>
          type={StakeBnbActions.fetchStats.toString()}
          loadingComponent={QueryLoadingAbsolute}
        >
          {({ data }) => {
            return (
              <>
                <StakerDashboardBnbComponent
                  walletBalance={data.walletBalance}
                  delegated={data.delegated}
                  rewardsAmount={data.rewardsAmount}
                  walletAccountId={walletAccountId}
                />
                <Query<IGetStakingHistoryData>
                  type={StakeBnbActions.fetchStakingHistory.toString()}
                  errorComponent={QueryError}
                  loadingComponent={QueryLoading}
                  showLoaderDuringRefetch={false}
                >
                  {({ data }) => (
                    <HistoryTableBnb
                      data={data.operations}
                      classes={{ root: classes.table }}
                    />
                  )}
                </Query>
              </>
            );
          }}
        </Query>
      </Curtains>
    </Box>
  );
};
