import * as React from 'react';
import { useEffect } from 'react';
import { usePoolTableStyles } from './PoolTableStyles';
import classNames from 'classnames';
import { t } from '../../common/utils/intl';
import { useLocaleMemo } from '../../common/hooks/useLocaleMemo';
import { ITablesCaptionProps } from '../TableComponents/types';
import { connect } from 'react-redux';
import { uid } from 'react-uid';
import { UserActions, UserActionTypes } from '../../store/actions/UserActions';
import { QueryError } from '../QueryError/QueryError';
import { QueryLoading } from '../QueryLoading/QueryLoading';
import { QueryEmpty } from '../QueryEmpty/QueryEmpty';
import { Query } from '@redux-requests/react';
import { Total } from '../Total';
import { IPool } from '../../store/apiMappers/poolsApi';
import { NavLink } from '../../UiKit/NavLink';
import { INDEX_PATH } from '../../common/const';
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableBodyCell,
} from '../TableComponents';

const TABLE_LIMIT = 4;

interface IPoolTableStoreProps {}

interface IPoolTableProps extends IPoolTableStoreProps {
  className?: string;
  fetchMicropools: typeof UserActions.fetchMicropools;
}

const useCaptions = (): Omit<ITablesCaptionProps, 'key'>[] =>
  useLocaleMemo(
    () => [
      {
        label: t('pool-table.name'),
      },
      {
        label: t('pool-table.provider'),
      },
      {
        label: t('pool-table.status'),
      },
      {
        label: t('pool-table.fee'),
      },
      {
        label: t('pool-table.total'),
      },
    ],
    [],
  );

export const PoolTableComponent = ({
  className,
  fetchMicropools,
}: IPoolTableProps) => {
  const classes = usePoolTableStyles();
  const captions = useCaptions();

  useEffect(() => {
    fetchMicropools();
  }, [fetchMicropools]);

  return (
    <Query<IPool[]>
      type={UserActionTypes.FETCH_MICROPOOLS}
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      noDataMessage={<QueryEmpty />}
    >
      {({ data }) => {
        return (
          <Table
            className={classNames(classes.component, className)}
            columnsCount={captions.length}
            customCell="1fr 1fr 1fr 1fr 2fr"
          >
            <TableHead>
              {captions.map(cell => (
                <TableHeadCell key={uid(cell)} label={cell.label} />
              ))}
            </TableHead>
            {data && (
              <TableBody rowsCount={data.length}>
                {data.slice(0, TABLE_LIMIT).map(row => (
                  <TableRow className={classes.row} key={uid(row)}>
                    <TableBodyCell>{row.name}</TableBodyCell>
                    <TableBodyCell>{row.provider}</TableBodyCell>
                    <TableBodyCell>{row.status}</TableBodyCell>
                    <TableBodyCell>{row.fee.toFormat()}</TableBodyCell>
                    <TableBodyCell>
                      <Total
                        total={row.totalStake.toNumber()}
                        reward={row.currentStake.toNumber()}
                      >
                        <NavLink
                          style={{ minWidth: 100 }}
                          href={INDEX_PATH}
                          variant="outlined"
                          size="large"
                          color="primary"
                        >
                          {t('navigation.join')}
                        </NavLink>
                      </Total>
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

export const PoolTable = connect((): IPoolTableStoreProps => ({}), {
  fetchMicropools: UserActions.fetchMicropools,
})(PoolTableComponent);