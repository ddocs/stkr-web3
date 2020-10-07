import React from 'react';
import { useBeaconListStyles } from './BeaconListStyles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import {
  ITablesCaptionProps,
  ITablesRowProps,
} from '../../../../components/TableComponents/types';
import { Table } from '../../../../components/TableComponents';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { t } from '../../../../common/utils/intl';
import { BEACON_NODE_DATA } from './mock';

interface IBeaconListStoreProps {
  data: ITablesRowProps[];
}

interface IBeaconListProps extends IBeaconListStoreProps {
  className?: string;
}

const useCaptions = (): ITablesCaptionProps[] =>
  useLocaleMemo(
    () => [
      {
        key: 'name',
        label: t('beacon-node-table.name'),
      },
      {
        key: 'uptime',
        label: t('beacon-node-table.uptime'),
      },
      {
        key: 'date',
        label: t('beacon-node-table.date'),
      },
      {
        key: 'certificate',
        label: t('beacon-node-table.certificate'),
      },
    ],
    [],
  );

export const BeaconListComponent = ({ className, data }: IBeaconListProps) => {
  const classes = useBeaconListStyles();

  const captions = useCaptions();

  return (
    <div className={classNames(classes.component, className)}>
      <Table
        className={classes.table}
        captions={captions}
        rows={data}
        customCell="1fr 1fr 1fr 0.7fr"
      />
    </div>
  );
};

export const BeaconList = connect(
  (state: IStoreState): IBeaconListStoreProps => {
    return {
      data: BEACON_NODE_DATA,
    };
  },
  {},
)(BeaconListComponent);
