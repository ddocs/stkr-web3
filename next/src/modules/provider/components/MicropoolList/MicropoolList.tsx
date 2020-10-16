import React from 'react';
import { useMicropoolListStyles } from './MicropoolListStyles';
import classNames from 'classnames';
import {
  ITablesCaptionProps,
  ITablesRowProps,
} from '../../../../components/TableComponents/types';
import { DataTable } from '../../../../components/TableComponents';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { t } from '../../../../common/utils/intl';
import { MicropoolListTotal } from './MicropoolListTotal';
import { EmptyList } from '../EmptyList';
import { IMicropoolListItemProps } from './types';

interface IMicropoolListProps {
  className?: string;
  data: ITablesRowProps[] | undefined;
  onCreateMicropool?(x: any): void;
}

const useCaptions = (): ITablesCaptionProps[] =>
  useLocaleMemo(
    () => [
      {
        key: 'name',
        label: t('micro-pool-table.name'),
      },
      {
        key: 'status',
        label: t('micro-pool-table.status'),
      },
      {
        key: 'fee',
        label: t('micro-pool-table.fee'),
      },
      {
        key: 'total',
        label: t('micro-pool-table.total'),
      },
    ],
    [],
  );

export const MicropoolListComponent = ({
  className,
  data,
}: IMicropoolListProps) => {
  const classes = useMicropoolListStyles();

  const captions = useCaptions();

  return (
    <div className={classNames(classes.component, className)}>
      {data === undefined ? (
        <EmptyList className={classes.empty} />
      ) : (
        <DataTable
          className={classes.table}
          captions={captions}
          rows={data}
          customCell="1fr 1fr 1fr 1.5fr"
        />
      )}
    </div>
  );
};

export const MicropoolList = ({
  className,
  data,
}: {
  data?: IMicropoolListItemProps[];
  className?: string;
}) => {
  const convertedData =
    data &&
    data.map(item => {
      return {
        data: {
          name: item.name,
          status: item.status,
          fee: t('units.eth', { value: item.fee }),
          total: (
            <MicropoolListTotal
              total={item.total}
              reward={item.reward}
              onChange={() => alert('Edit')}
              reference={item}
            />
          ),
        },
      };
    });
  return <MicropoolListComponent className={className} data={convertedData} />;
};
