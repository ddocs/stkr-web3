import React, { useEffect } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { useStakerDasboardStyles } from './StakerDashboardStyles';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { t } from '../../../../common/utils/intl';
import { Amount } from './components/Amount';
import { TableHead } from '../../../../components/TableComponents/TableHead';
import { TableHeadCell } from '../../../../components/TableComponents/TableHeadCell';
import { TableBody } from '../../../../components/TableComponents/TableBody';
import { TableRow } from '../../../../components/TableComponents/TableRow';
import { uid } from 'react-uid';
import { TableBodyCell } from '../../../../components/TableComponents/TableBodyCell';
import { Table } from '../../../../components/TableComponents/Table';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
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
import { EthIcon } from '../../../../UiKit/Icons/EthIcon';
import { AEthIcon } from '../../../../UiKit/Icons/AEthIcon';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { walletConversion } from '../../../../common/utils/convertWallet';

const ENABLE_REDEEM = false;

export const StakerDashboardComponent = () => {
  const classes = useStakerDasboardStyles();
  const dispatch = useDispatch();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('staked-dashboard.column.status'),
      },
      {
        label: t('staked-dashboard.column.staked'),
      },
      {
        label: t('staked-dashboard.column.transaction-hash'),
      },
    ],
    [],
  );

  const handleClaim = () => {
    dispatch(UserActions.claimAeth());
  };

  const handleUnstake = () => {
    dispatch(UserActions.unstake());
  };

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
              <div className={classes.leftColumn}>
                <div className={classes.half}>
                  <div className={classes.content}>
                    <Typography className={classes.headline}>
                      {t('staked-dashboard.staked')}
                    </Typography>
                    <div className={classes.buttons}>
                      <NavLink
                        variant="contained"
                        color="primary"
                        size="large"
                        href={STAKER_STAKE_PATH}
                        fullWidth={true}
                      >
                        {t('staked-dashboard.stake-more')}
                      </NavLink>
                      <MutationErrorHandler type={UserActionTypes.UNSTAKE} />
                      <Mutation type={UserActionTypes.UNSTAKE}>
                        {({ loading }) => (
                          <Button
                            size="large"
                            color="primary"
                            onClick={handleUnstake}
                            disabled={loading}
                          >
                            {t('staker-dashboard.unstake')}
                          </Button>
                        )}
                      </Mutation>
                    </div>
                    {data?.staked && (
                      <Amount
                        value={data.staked.toFormat()}
                        unit={<EthIcon size="md" />}
                      />
                    )}
                  </div>
                </div>

                <div className={classes.half}>
                  <div className={classes.content}>
                    <Typography className={classes.headline}>
                      {t('staked-dashboard.current-a-eth-balance')}
                    </Typography>
                    <MutationErrorHandler type={UserActionTypes.CLAIM_A_ETH} />
                    <Mutation type={UserActionTypes.CLAIM_A_ETH}>
                      {({ loading }) => (
                        <Button
                          size="large"
                          color="primary"
                          fullWidth={true}
                          onClick={handleClaim}
                          disabled={loading || !ENABLE_REDEEM}
                        >
                          {t('staked-dashboard.redeem')}
                        </Button>
                      )}
                    </Mutation>
                    {data?.aEthBalance && (
                      <Amount
                        value={data.aEthBalance.toFormat()}
                        unit={<AEthIcon size="md" />}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div>
                {data && data.stakes.length > 0 && (
                  <BackgroundColorProvider className={classes.history}>
                    <Table
                      customCell="1fr 1fr 1fr"
                      columnsCount={captions.length}
                      classes={{ table: classes.table }}
                    >
                      <TableHead>
                        {captions.map(cell => (
                          <TableHeadCell key={cell.label} label={cell.label} />
                        ))}
                      </TableHead>
                      <TableBody rowsCount={data.stakes.length}>
                        {data.stakes.map(item => (
                          <TableRow key={uid(item)}>
                            <TableBodyCell>
                              {t(`staked-dashboard.statuses.${item.action}`)}
                            </TableBodyCell>
                            <TableBodyCell>
                              {t('units.eth', {
                                value: item.amount.toFormat(),
                              })}
                            </TableBodyCell>
                            <TableBodyCell>
                              <NavLink
                                href={t('staked-dashboard.transaction', {
                                  value: item.transactionHash,
                                })}
                              >
                                {walletConversion(item.transactionHash)}
                              </NavLink>
                            </TableBodyCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </BackgroundColorProvider>
                )}
              </div>
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
