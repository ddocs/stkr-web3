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
import { IMicropool } from '../../store/apiMappers/poolsApi';
import { NavLink } from '../../UiKit/NavLink';
import { DEFAULT_STAKING_AMOUNT, INDEX_PATH } from '../../common/const';
import { Table, TableBody, TableBodyCell, TableHead, TableHeadCell, TableRow, } from '../TableComponents';

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
    <Query<IMicropool[]>
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
            customCell="1fr 1fr 1fr 2fr"
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
                    <TableBodyCell>
                      <Total
                        total={row.balance.toNumber()}
                        reward={DEFAULT_STAKING_AMOUNT}
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
