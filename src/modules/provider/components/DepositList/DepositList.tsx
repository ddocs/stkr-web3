import { Query } from '@redux-requests/react';
import React from 'react';
import { uid } from 'react-uid';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { DepositType } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoadingAbsolute } from '../../../../components/QueryLoading/QueryLoading';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../../../components/TableComponents';
import { ITablesCaptionProps } from '../../../../components/TableComponents/types';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import {
  IStakeHistoryItem,
  IStakingHistory,
} from '../../../../store/apiMappers/stakerStatsApi';
import { NotEnoughBalance } from '../NotEnoughBalance';

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

export const DepositListComponent = () => {
  const captions = useCaptions();

  return (
    <Query<IStakingHistory | null>
      type={UserActionTypes.FETCH_STAKING_HISTORY}
      showLoaderDuringRefetch={false}
      noDataMessage={<NotEnoughBalance />}
      isDataEmpty={({ data }) => {
        return getTopUpTransactions(data?.stakes ?? []).length === 0;
      }}
      errorComponent={QueryError}
      loadingComponent={QueryLoadingAbsolute}
    >
      {({ data }) => {
        const stakes = getTopUpTransactions(data?.stakes ?? []);

        return (
          <Table
            columnsCount={captions.length}
            customCell="0.4fr 1fr 0.4fr"
            paddingCollapse
            stickyHeader
          >
            <TableHead>
              {captions.map(cell => (
                <TableHeadCell key={uid(cell)} label={cell.label} />
              ))}
            </TableHead>

            {stakes && (
              <TableBody>
                {stakes.map(item => (
                  <TableRow key={uid(item)}>
                    <TableBodyCell label={`${captions[0].label}`}>
                      {t(`stake-statuses.${item.action}`)}
                    </TableBodyCell>

                    <TableBodyCell label={`${captions[1].label}`}>
                      <span title={item.transactionHash}>
                        {item.transactionHash}
                      </span>
                    </TableBodyCell>

                    <TableBodyCell label={`${captions[2].label}`}>
                      {t(
                        item.type === DepositType.ETH
                          ? 'unit.eth-value'
                          : 'unit.ankr-value',
                        { value: item.amount },
                      )}
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

export const DepositList = () => {
  return <DepositListComponent />;
};
