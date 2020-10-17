import React from 'react';
import { useBeaconListStyles } from './BeaconListStyles';
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
import { Button } from '../../../../UiKit/Button';
import { IBeaconListItem } from './types';
import { BEACON_NODE_DATA } from '../../mock';
import { UserActions } from '../../../../store/actions/UserActions';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { differenceInCalendarMonths } from 'date-fns';
import { SidecarReply } from '../../../api/gateway';
import { StkrSdk } from '../../../api';

interface IBeaconListProps {
  className?: string;
  data?: ITablesRowProps[];
}

const useCaptions = (): ITablesCaptionProps[] =>
  useLocaleMemo(
    () => [
      {
        key: 'name',
        label: t('beacon-node-table.name'),
      },
      {
        key: 'status',
        label: t('beacon-node-table.status'),
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
      {data && (
        <DataTable
          className={classes.table}
          captions={captions}
          rows={data}
          customCell="1fr 1fr 1fr 1fr 0.7fr"
        />
      )}
    </div>
  );
};

export const BeaconListImp = ({
  className,
  data,
  fetchCurrentProviderSidecars,
}: {
  className?: string;
  data: IBeaconListItem[];
  fetchCurrentProviderSidecars: typeof UserActions.fetchCurrentProviderSidecars;
}) => {
  useInitEffect(() => {
    fetchCurrentProviderSidecars();
  });

  const convertedData =
    data &&
    data.map(item => {
      return {
        data: {
          name: item.name,
          uptime: item.uptime,
          date: item.date,
          status: item.status,
          certificate: (
            <Button
              onClick={() => {
                const downloadLink = StkrSdk.getLastInstance().createSidecarDownloadLink(
                  item.id,
                );
                window.open(downloadLink, '_blank');
              }}
            >
              {t('navigation.download')}
            </Button>
          ),
        },
      };
    });
  return <BeaconListComponent className={className} data={convertedData} />;
};

export const BeaconList = connect(
  (state: IStoreState) => {
    // @ts-ignore
    const sidecars = state['requests'].queries['FETCH_SIDECARS']?.data || [];
    // TODO: "i know that its wrong, fix me"
    return {
      data: sidecars.map((sidecar: SidecarReply) => {
        return {
          id: sidecar.id,
          name: sidecar.id,
          uptime: differenceInCalendarMonths(
            new Date().getTime(),
            sidecar.activated,
          ),
          date: new Date(sidecar.created).toLocaleString(),
          status: String(sidecar.status).substr('SIDECAR_STATUS_'.length),
        };
      }),
    };
  },
  { fetchCurrentProviderSidecars: UserActions.fetchCurrentProviderSidecars },
)(BeaconListImp);
