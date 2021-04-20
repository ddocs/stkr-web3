import { fade, Paper, Theme, useTheme } from '@material-ui/core';
import { Query } from '@redux-requests/react';
import { formatDistanceToNowStrict } from 'date-fns';
import React, { useMemo } from 'react';
import { uid } from 'react-uid';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { t } from '../../../../common/utils/intl';
import { safeDiv } from '../../../../common/utils/safeDiv';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../../../components/TableComponents';
import { ITablesCaptionProps } from '../../../../components/TableComponents/types';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { IProviderStats } from '../../../../store/apiMappers/providerStatsApi';
import { ISidecar } from '../../../../store/apiMappers/sidecarsApi';
import { EmptyNodeList } from '../EmptyNodeList';
import { NodeListLoader } from '../NodeListLoader';
import { SidecarLauncher } from '../SidecarLauncher';
import { useNodeListStyles } from './NodeListStyles';

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

const getSidecarName = (item: ISidecar) => {
  if (item.name) {
    return item.name;
  }

  return item.id;
};

const getSidecarStatus = (item: ISidecar, theme: Theme) => {
  let statusName = t(`node-list.status.${item.status}`);
  if (item.status === 'SIDECAR_STATUS_UNKNOWN') {
    statusName = t('node-list.unknown');
  }
  if (item.status === 'SIDECAR_STATUS_SYNCING') {
    statusName = t('node-list.syncing', {
      value: `${(
        100 *
        safeDiv(item?.beaconChain?.currentSlot, item?.beaconChain?.latestSlot)
      ).toFixed(2)}`,
    });
  }

  const color = (() => {
    if (item.status === 'SIDECAR_STATUS_ACTIVE') {
      return theme.palette.primary.main;
    } else if (
      item.status === 'SIDECAR_STATUS_SYNCING' ||
      item.status === 'SIDECAR_STATUS_ATTESTING'
    ) {
      return theme.palette.warning.main;
    } else if (item.status === 'SIDECAR_STATUS_OFFLINE') {
      return theme.palette.error.main;
    }
    return fade(theme.palette.text.primary, 0.5);
  })();

  return (
    <div style={{ color: color }}>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="5" cy="5" r="5" fill={color} />
      </svg>
      &nbsp;
      {statusName}
    </div>
  );
};

interface INodeListProps {
  data: ISidecar[];
  onCreateNode: () => void;
}

export const NodeListComponent = ({ data, onCreateNode }: INodeListProps) => {
  const classes = useNodeListStyles();
  const captions = useCaptions();
  const hasTransactions = data.length > 0;
  const theme = useTheme();

  const renderedCells = useMemo(
    () =>
      data.map(item => {
        const sidecarName = getSidecarName(item);
        const sidecarDate = t('format.date', { value: item.created });

        return (
          <TableRow key={uid(item)}>
            <TableBodyCell
              className={classes.tableCell}
              label={`${captions[0].label}`}
            >
              <span title={sidecarName}>{sidecarName}</span>
            </TableBodyCell>

            <TableBodyCell
              className={classes.tableCell}
              label={`${captions[1].label}`}
            >
              {getSidecarStatus(item, theme)}
            </TableBodyCell>

            <TableBodyCell
              className={classes.tableCell}
              label={`${captions[2].label}`}
            >
              {formatDistanceToNowStrict(
                item?.machine?.currentTime
                  ? new Date(item.machine.currentTime * 1000)
                  : new Date(),
                { addSuffix: true },
              )}
            </TableBodyCell>

            <TableBodyCell
              className={classes.tableCell}
              label={`${captions[3].label}`}
            >
              <span title={sidecarDate}>{sidecarDate}</span>
            </TableBodyCell>

            <TableBodyCell
              className={classes.tableCell}
              label={`${captions[4].label}`}
              classes={{ cellWrapper: classes.icons }}
            >
              <SidecarLauncher id={item.id} />
            </TableBodyCell>
          </TableRow>
        );
      }),
    [captions, classes.icons, classes.tableCell, data, theme],
  );

  if (hasTransactions) {
    return (
      <>
        <Table
          customCell="1fr 1fr 1fr 1fr 230px"
          columnsCount={captions.length}
          className={classes.table}
          minWidth={1000}
          paddingCollapse
          stickyHeader
        >
          <TableHead>
            {captions.map(cell => (
              <TableHeadCell key={cell.key} label={cell.label} />
            ))}
          </TableHead>
          {data && <TableBody>{renderedCells}</TableBody>}
        </Table>

        <NodeListLoader />
      </>
    );
  }

  return (
    <Paper variant="outlined" square={false} className={classes.noticeWrapper}>
      <EmptyNodeList onSubmit={onCreateNode} />
    </Paper>
  );
};

export const NodeList = ({
  data,
  handleCreateNode,
}: {
  className?: string;
  data: ISidecar[];
  handleCreateNode: () => void;
}) => {
  return (
    <Query<IProviderStats | null>
      type={UserActionTypes.FETCH_PROVIDER_STATS}
      showLoaderDuringRefetch={false}
    >
      {({ data: statsData }) => {
        return (
          <>
            {statsData?.ethBalance && (
              <NodeListComponent data={data} onCreateNode={handleCreateNode} />
            )}
          </>
        );
      }}
    </Query>
  );
};
