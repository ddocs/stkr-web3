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
import { IStakerStats } from '../../../../store/apiMappers/stakerStatsApi';
import { ITablesCaptionProps } from '../../../../components/TableComponents/types';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { t } from '../../../../common/utils/intl';

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

export const TopUpListComponent = () => {
  const captions = useCaptions();
  return (
    <Query<IStakerStats | null>
      type={UserActionTypes.FETCH_STAKER_STATS}
      showLoaderDuringRefetch={false}
    >
      {({ data }) => {
        const stakes = data?.stakes.filter(item => item.isTopUp);

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
