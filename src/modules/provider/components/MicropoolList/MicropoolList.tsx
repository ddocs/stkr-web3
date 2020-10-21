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
import { Button } from '../../../../UiKit/Button';

interface IMicropoolListProps {
  className?: string;
  data?: IPool[];
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
          customCell="1fr 1fr 1fr 1.5fr"
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
                  <TableBodyCell>{item.name}</TableBodyCell>
                  <TableBodyCell>
                    {t(`micropool-list.status.${item.status}`)}
                  </TableBodyCell>
                  <TableBodyCell>{item.fee.toFormat()}</TableBodyCell>
                  <TableBodyCell>
                    <Total
                      total={item.totalStake.toNumber()}
                      reward={item.currentStake.toNumber()}
                    >
                      <Button
                        variant="text"
                        size="medium"
                        color="secondary"
                        onClick={() => alert()}
                      >
                        {t('navigation.edit')}
                      </Button>
                    </Total>
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
