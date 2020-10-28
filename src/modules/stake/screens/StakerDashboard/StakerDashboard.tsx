import React, { useEffect } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { useStakerDasboardStyles } from './StakerDashboardStyles';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Body1 } from '../../../../UiKit/Typography';
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
import { Query } from '@redux-requests/react';
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

export const StakerDashboardComponent = () => {
  const classes = useStakerDasboardStyles();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('staked-dashboard.column.date'),
      },
      {
        label: t('staked-dashboard.column.staked'),
      },
      {
        label: t('staked-dashboard.column.rewards'),
      },
    ],
    [],
  );

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        <div className={classes.content}>
          <Query<IStakerStats | null>
            type={UserActionTypes.FETCH_STAKER_STATS}
            errorComponent={QueryError}
            loadingComponent={QueryLoadingCentered}
            noDataMessage={<QueryEmpty />}
          >
            {({ data }) => {
              return (
                <>
                  <BackgroundColorProvider className={classes.staked}>
                    <Body1 className={classes.stakedTitle}>
                      {t('staked-dashboard.staked')}
                    </Body1>
                    <div className={classes.stakedAmount}>
                      {data?.staked && (
                        <Amount
                          value={data.staked.toFormat()}
                          unit={t('staked-dashboard.eth')}
                        />
                      )}
                    </div>
                    <div className={classes.stakedButton}>
                      <NavLink
                        variant="contained"
                        color="primary"
                        size="large"
                        href={STAKER_STAKE_PATH}
                        fullWidth={true}
                      >
                        {t('staked-dashboard.stake-more')}
                      </NavLink>
                    </div>
                  </BackgroundColorProvider>
                  <BackgroundColorProvider className={classes.reward}>
                    <Body1 className={classes.rewardTitle}>
                      {t('staked-dashboard.my-rewards')}
                    </Body1>
                    {data?.reward && (
                      <Amount
                        value={data.reward.toFormat()}
                        unit={t('staked-dashboard.eth')}
                      />
                    )}
                  </BackgroundColorProvider>
                  {data && data.stakes.length > 0 && (
                    <BackgroundColorProvider className={classes.history}>
                      <Table
                        customCell="1fr 1fr 1fr"
                        columnsCount={captions.length}
                      >
                        <TableHead>
                          {captions.map(cell => (
                            <TableHeadCell
                              key={cell.label}
                              label={cell.label}
                            />
                          ))}
                        </TableHead>
                        <TableBody rowsCount={data.stakes.length}>
                          {data.stakes.map(item => (
                            <TableRow key={uid(item)}>
                              <TableBodyCell>
                                {t('format.date', { value: item.date })}
                              </TableBodyCell>
                              <TableBodyCell>
                                {t('units.eth', {
                                  value: item.amount.toFormat(),
                                })}
                              </TableBodyCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </BackgroundColorProvider>
                  )}
                </>
              );
            }}
          </Query>
        </div>
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
