import React from 'react';
import { useBeaconListStyles } from './BeaconListStyles';
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
import { Button } from '../../../../UiKit/Button';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { StkrSdk } from '../../../api';
import { useQuery } from '@redux-requests/react';
import { uid } from 'react-uid';
import { ISidecar } from '../../../../store/apiMappers/sidecarsAPI';
import { formatDistanceToNowStrict } from 'date-fns';

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

interface IBeaconListProps {
  className?: string;
  data?: ISidecar[];
}

export const BeaconListComponent = ({ className, data }: IBeaconListProps) => {
  const classes = useBeaconListStyles();

  const captions = useCaptions();

  return (
    <div className={classNames(classes.component, className)}>
      <Table customCell="1fr 1fr 1fr 1fr 0.7fr" columnsCount={captions.length}>
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
                <TableBodyCell>{item.id}</TableBodyCell>
                <TableBodyCell>
                  {t(`beacon-list.status.${item.status}`)}
                </TableBodyCell>
                <TableBodyCell>
                  {formatDistanceToNowStrict(item.created, { addSuffix: true })}
                </TableBodyCell>
                <TableBodyCell>
                  {t('format.date', { value: item.created })}
                </TableBodyCell>
                <TableBodyCell>
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
                </TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export const BeaconListImp = ({
  className,
  data,
}: {
  className?: string;
  data: ISidecar[];
}) => {
  return <BeaconListComponent className={className} data={data} />;
};

export const BeaconList = ({ className }: { className?: string }) => {
  const { data: sidecars } = useQuery<ISidecar[]>({
    type: UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS,
  });

  return <BeaconListImp className={className} data={sidecars} />;
};
