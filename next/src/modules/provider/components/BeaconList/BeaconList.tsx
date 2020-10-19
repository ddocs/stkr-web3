import React from 'react';
import { useBeaconListStyles } from './BeaconListStyles';
import classNames from 'classnames';
import {
  ITablesCaptionProps,
  ITablesRowProps,
} from '../../../../components/TableComponents/types';
import { DataTable } from '../../../../components/TableComponents';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { differenceInCalendarMonths } from 'date-fns';
import { SidecarReply } from '../../../api/gateway';
import { StkrSdk } from '../../../api';
import { useQuery } from '@redux-requests/react';

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
}: {
  className?: string;
  data: SidecarReply[];
}) => {
  const convertedData =
    data &&
    data.map(item => {
      return {
        data: {
          name: item.id,
          uptime: differenceInCalendarMonths(
            new Date().getTime(),
            item.activated,
          ),
          date: new Date(item.created).toLocaleString(),
          status: String(item.status).substr('SIDECAR_STATUS_'.length),
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

export const BeaconList = ({ className }: { className?: string }) => {
  const { data: sidecars } = useQuery<SidecarReply[]>({
    type: UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS,
  });

  return <BeaconListImp className={className} data={sidecars} />;
};
