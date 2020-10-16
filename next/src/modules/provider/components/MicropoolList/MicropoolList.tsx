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
import { IMicropoolListItemProps } from './types';
import { uid } from 'react-uid';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { useAction } from '../../../../store/redux';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Query } from '@redux-requests/react';
import { IPool } from '../../../../store/apiMappers/poolsApi';
import { Total } from '../../../../components/Total';
import { Button } from '../../../../UiKit/Button';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { QueryEmpty } from '../../../../components/QueryEmpty/QueryEmpty';

interface IMicropoolListProps {
  className?: string;
  data: IPool[] | undefined;
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
        <>
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
        </>
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
  const dispatchFetchCurrentProviderMicropools = useAction(
    UserActions.fetchCurrentProviderMicropools,
  );

  useInitEffect(() => {
    dispatchFetchCurrentProviderMicropools();
  });

  return (
    <Query<IPool[]>
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      noDataMessage={<QueryEmpty />}
      type={UserActionTypes.FETCH_CURRENT_PROVIDER_MICROPOOLS}
    >
      {({ data }) => {
        return <MicropoolListComponent className={className} data={data} />;
      }}
    </Query>
  );
};
