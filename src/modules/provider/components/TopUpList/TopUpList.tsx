import React from 'react';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../../../components/TableComponents';
import { uid } from 'react-uid';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { Query } from '@redux-requests/react';
import {
  IStakeHistoryItem,
  IStakerStats,
} from '../../../../store/apiMappers/stakerStatsApi';
import { ITablesCaptionProps } from '../../../../components/TableComponents/types';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { t } from '../../../../common/utils/intl';
import { NotEnoughBalance } from '../NotEnoughBalance';
import { Box, Paper } from '@material-ui/core';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoadingCentered } from '../../../../components/QueryLoading/QueryLoading';

const useCaptions = (): ITablesCaptionProps[] =>
  useLocaleMemo(
    () => [
      {
        key: 'status',
        label: t('top-up-list.table-head.status'),
      },
      {
        key: 'txid',
        label: t('top-up-list.table-head.txid'),
      },
      {
        key: 'amount',
        label: t('top-up-list.table-head.amount'),
      },
    ],
    [],
  );

function getTopUpTransactions(items: IStakeHistoryItem[]) {
  return items.filter(item => item.isTopUp);
}

export const TopUpListComponent = () => {
  const captions = useCaptions();

  return (
    <Query<IStakerStats | null>
      type={UserActionTypes.FETCH_STAKER_STATS}
      showLoaderDuringRefetch={false}
      noDataMessage={
        <Paper variant="outlined" square={false}>
          <Box minHeight={440} display="flex" alignItems="center" padding={5}>
            <NotEnoughBalance />
          </Box>
        </Paper>
      }
      isDataEmpty={({ data }) => {
        return getTopUpTransactions(data?.stakes ?? []).length === 0;
      }}
      errorComponent={QueryError}
      loadingComponent={QueryLoadingCentered}
    >
      {({ data }) => {
        const stakes = getTopUpTransactions(data?.stakes ?? []);

        return (
          <Table columnsCount={captions.length}>
            <TableHead>
              {captions.map(cell => (
                <TableHeadCell key={uid(cell)} label={cell.label} />
              ))}
            </TableHead>
            {stakes && (
              <TableBody rowsCount={stakes.length}>
                {stakes.map(item => (
                  <TableRow key={uid(item)}>
                    <TableBodyCell>
                      {t(`stake-statuses.${item.action}`)}
                    </TableBodyCell>
                    <TableBodyCell>{item.transactionHash}</TableBodyCell>
                    <TableBodyCell>
                      {t('unit.eth-value', { value: item.amount })}
                    </TableBodyCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        );
      }}
    </Query>
  );
};

export const TopUpList = () => {
  return <TopUpListComponent />;
};
