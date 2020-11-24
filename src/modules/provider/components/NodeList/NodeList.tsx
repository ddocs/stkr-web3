import React from 'react';
import { useNodeListStyles } from './NodeListStyles';
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
import { StkrSdk } from '../../../api';
import { uid } from 'react-uid';
import { ISidecar } from '../../../../store/apiMappers/sidecarsApi';
import { IconButton } from '@material-ui/core';
import { ReactComponent as WindowsIcon } from './assets/windows.svg';
import { ReactComponent as LinuxIcon } from './assets/linux.svg';
import { ReactComponent as MacIcon } from './assets/mac.svg';
import { safeDiv } from '../../../../common/utils/safeDiv';
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

interface INodeListProps {
  className?: string;
  data?: ISidecar[];
}

const getSidecarName = (item: ISidecar) => {
  let name = item.id;
  if (item.machine) {
    name = `${item.machine.cpuModel}`;
  }
  let color = '#D1FF1B';
  if (item.status === 'SIDECAR_STATUS_UNKNOWN') {
    color = '#ff3d1b';
  } else if (item.status === 'SIDECAR_STATUS_SYNCING') {
    color = '#ff981b';
  }
  return (
    <>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="5" cy="5" r="5" fill={color} />
      </svg>
      &nbsp; &nbsp;
      {name}
    </>
  );
};

const getSidecarStatus = (item: ISidecar) => {
  if (item.status === 'SIDECAR_STATUS_UNKNOWN') {
    return t('node-list.unknown');
  }
  if (item.status === 'SIDECAR_STATUS_SYNCING') {
    return t('node-list.syncing', {
      value: `${(
        100 *
        safeDiv(item?.beaconChain?.currentSlot, item?.beaconChain?.latestSlot)
      ).toFixed(2)}`,
    });
  }
  return t(`beacon-list.status.${item.status}`);
};

export const NodeListComponent = ({ className, data }: INodeListProps) => {
  const classes = useNodeListStyles();

  const captions = useCaptions();

  return (
    <div className={classNames(classes.component, className)}>
      <Table
        customCell="1.1fr 0.6fr 0.6fr 0.7fr 0.7fr"
        columnsCount={captions.length}
        className={classes.table}
      >
        <TableHead>
          {captions.map(cell => (
            <TableHeadCell key={cell.key} label={cell.label} />
          ))}
        </TableHead>
        {data && (
          <TableBody rowsCount={data.length}>
            {data.map(item => (
              <TableRow key={uid(item)}>
                <TableBodyCell>{getSidecarName(item)}</TableBodyCell>
                <TableBodyCell>{getSidecarStatus(item)}</TableBodyCell>
                <TableBodyCell>
                  {formatDistanceToNowStrict(
                    item?.machine?.currentTime
                      ? new Date(item.machine.currentTime * 1000)
                      : new Date(),
                    { addSuffix: true },
                  )}
                </TableBodyCell>
                <TableBodyCell>
                  {t('format.date', { value: item.created })}
                </TableBodyCell>
                <TableBodyCell>
                  <IconButton
                    component="a"
                    className={classes.icon}
                    onClick={() => {
                      StkrSdk.getLastInstance().downloadSidecar(
                        item.id,
                        'windows-amd64',
                      );
                    }}
                    target="_blank"
                  >
                    <WindowsIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    className={classes.icon}
                    onClick={() => {
                      StkrSdk.getLastInstance().downloadSidecar(
                        item.id,
                        'linux-amd64',
                      );
                    }}
                    target="_blank"
                  >
                    <LinuxIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    className={classes.icon}
                    onClick={() => {
                      StkrSdk.getLastInstance().downloadSidecar(
                        item.id,
                        'darwin-amd64',
                      );
                    }}
                    target="_blank"
                  >
                    <MacIcon />
                  </IconButton>
                </TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export const NodeList = ({
  className,
  data,
}: {
  className?: string;
  data: ISidecar[];
}) => {
  return <NodeListComponent className={className} data={data} />;
};
