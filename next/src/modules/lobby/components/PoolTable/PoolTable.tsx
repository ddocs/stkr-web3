import * as React from 'react';
import { usePoolTableStyles } from './PoolTableStyles';
import classNames from 'classnames';
import { t } from '../../../../common/utils/intl';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import {
  ITablesCaptionProps,
  ITablesRowProps,
} from '../../../../components/TableComponents/types';
import { POOL_DATA } from './mock';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { Table } from '../../../../components/TableComponents/Table/Table';
import { TableHead } from '../../../../components/TableComponents/TableHead';
import { TableHeadCell } from '../../../../components/TableComponents/TableHeadCell/TableHeadCell';
import { TableBody } from '../../../../components/TableComponents/TableBody';
import { TableRow } from '../../../../components/TableComponents/TableRow';
import { uid } from 'react-uid';
import { TableBodyCell } from '../../../../components/TableComponents/TableBodyCell';

interface IPoolTableStoreProps {
  data: ITablesRowProps[];
}

interface IPoolTableProps extends IPoolTableStoreProps {
  className?: string;
}

const useCaptions = (): ITablesCaptionProps[] =>
  useLocaleMemo(
    () => [
      {
        key: 'name',
        label: t('pool-table.name'),
      },
      {
        key: 'provider',
        label: t('pool-table.provider'),
      },
      {
        key: 'status',
        label: t('pool-table.status'),
      },
      {
        key: 'fee',
        label: t('pool-table.fee'),
      },
      {
        key: 'total',
        label: t('pool-table.total'),
      },
    ],
    [],
  );

export const PoolTableComponent = ({ className, data }: IPoolTableProps) => {
  const classes = usePoolTableStyles();
  const captions = useCaptions();

  return (
    <Table
      className={classNames(classes.component, className)}
      columnsCount={captions.length}
      customCell="1fr 1fr 1fr 1fr 2fr"
    >
      <TableHead>
        {captions.map(cell => (
          <TableHeadCell key={cell.key} label={cell.label} align={cell.align} />
        ))}
      </TableHead>
      {data && (
        <TableBody>
          {data.map(row => (
            <TableRow className={classes.row} key={uid(row)}>
              {captions.map(cell => (
                <TableBodyCell key={cell.key} align={cell.align}>
                  {row.data[cell.key]}
                </TableBodyCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

export const PoolTable = connect((state: IStoreState): IPoolTableStoreProps => {
  return {
    data: POOL_DATA,
  };
}, {})(PoolTableComponent);
