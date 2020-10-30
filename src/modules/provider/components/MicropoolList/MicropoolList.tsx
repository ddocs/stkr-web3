import React from 'react';
import { useMicropoolListStyles } from './MicropoolListStyles';
import classNames from 'classnames';
import { ITablesCaptionProps } from '../../../../components/TableComponents/types';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../../../components/TableComponents';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { t } from '../../../../common/utils/intl';
import { EmptyList } from '../EmptyList';
import { uid } from 'react-uid';
import { IPool } from '../../../../store/apiMappers/poolsApi';
import { Total } from '../../../../components/Total';
import { NavLink } from '../../../../UiKit/NavLink';
import { walletConversion } from '../../../../common/utils/convertWallet';
import { formatDistanceToNowStrict } from 'date-fns';

interface IMicropoolListProps {
  className?: string;
  data: IPool[] | null;
  onCreateMicropool?(x: any): void;
}

const useCaptions = (): ITablesCaptionProps[] =>
  useLocaleMemo(
    () => [
      {
        key: 'poolIndex',
        label: t('micro-pool-table.poolIndex'),
      },
      {
        key: 'name',
        label: t('micro-pool-table.name'),
      },
      {
        key: 'status',
        label: t('micro-pool-table.status'),
      },
      {
        key: 'lastReward',
        label: t('micro-pool-table.lastReward'),
      },
      {
        key: 'lastSlashing',
        label: t('micro-pool-table.lastSlashing'),
      },
      {
        key: 'total',
        label: t('micro-pool-table.total'),
      },
      {
        key: 'startTime',
        label: t('micro-pool-table.startTime'),
      },
    ],
    [],
  );

export const MicropoolList = ({ className, data }: IMicropoolListProps) => {
  const classes = useMicropoolListStyles();

  const captions = useCaptions();

  return (
    <div className={classNames(classes.component, className)}>
      {!data || !data.length ? (
        <EmptyList />
      ) : (
        <Table
          columnsCount={captions.length}
          className={classes.table}
          customCell="0.7fr 1fr 1fr 1fr 1fr 1fr 1.5fr"
        >
          <TableHead>
            {captions.map(cell => (
              <TableHeadCell
                key={cell.key}
                label={cell.label}
                align={cell.align}
              />
            ))}
          </TableHead>
          {data && (
            <TableBody rowsCount={data.length}>
              {data.map(item => (
                <TableRow key={uid(item)}>
                  <TableBodyCell>
                    {t('micropool-list.pool-index', { value: item.poolIndex })}
                  </TableBodyCell>
                  <TableBodyCell>{item.name}</TableBodyCell>
                  <TableBodyCell>
                    {t(`micropool-list.status.${item.status}`)}
                  </TableBodyCell>
                  <TableBodyCell>
                    {t('units.eth', { value: item.lastReward.toFormat() })}
                  </TableBodyCell>
                  <TableBodyCell>
                    {t('units.eth', { value: item.lastSlashing.toFormat() })}
                  </TableBodyCell>
                  <TableBodyCell>
                    <Total
                      total={item.totalStake.toNumber()}
                      reward={item.currentStake.toNumber()}
                    >
                      {item.transactionHash && (
                        <NavLink
                          href={t('micropool-list.transaction', {
                            value: item.transactionHash,
                          })}
                        >
                          {walletConversion(item.transactionHash)}
                        </NavLink>
                      )}
                    </Total>
                  </TableBodyCell>
                  <TableBodyCell>
                    {t('node-list.ago', {
                      value: formatDistanceToNowStrict(item.startTime),
                    })}
                  </TableBodyCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </div>
  );
};
