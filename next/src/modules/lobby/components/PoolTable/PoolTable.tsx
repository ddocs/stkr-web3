import * as React from 'react';
import { usePoolTableStyles } from './PoolTableStyles';
import classNames from 'classnames';
import { t } from '../../../../common/utils/intl';
import { DataTable } from '../../../../components/TableComponents';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import {
  ITablesCaptionProps,
  ITablesRowProps,
} from '../../../../components/TableComponents/types';
import { POOL_DATA } from './mock';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';

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
    <DataTable
      className={classNames(classes.component, className)}
      captions={captions}
      rows={data}
      customCell="1fr 1fr 1fr 1fr 2fr"
    />
  );
};

export const PoolTable = connect((state: IStoreState): IPoolTableStoreProps => {
  return {
    data: POOL_DATA,
  };
}, {})(PoolTableComponent);
