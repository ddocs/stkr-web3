import React from 'react';
import { useMicropoolListStyles } from './MicropoolListStyles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import {
  ITablesCaptionProps,
  ITablesRowProps,
} from '../../../../components/TableComponents/types';
import { DataTable } from '../../../../components/TableComponents';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { t } from '../../../../common/utils/intl';
import { MICRO_POOL_DATA } from '../../mock';
import { Headline4 } from '../../../../UiKit/Typography';
import { Button } from '../../../../UiKit/Button';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { NavLink } from '../../../../UiKit/Link';
import { CREATE_PROVIDERS_BEACON_CHAIN_PATH } from '../../../../common/const';

interface IMicropoolListStoreProps {
  data: ITablesRowProps[] | undefined;
}

interface IMicropoolListProps extends IMicropoolListStoreProps {
  className?: string;
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
        <BackgroundColorProvider className={classes.empty}>
          <Headline4 className={classes.caption} color="primary">
            {t('micro-pool-table.empty')}
          </Headline4>
          <NavLink
            className={classes.create}
            variant="contained"
            color="primary"
            size="large"
            href={CREATE_PROVIDERS_BEACON_CHAIN_PATH}
          >
            {t('navigation.create')}
          </NavLink>
        </BackgroundColorProvider>
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

export const MicropoolList = connect(
  (state: IStoreState): IMicropoolListStoreProps => {
    return {
      data: MICRO_POOL_DATA,
    };
  },
  {},
)(MicropoolListComponent);
