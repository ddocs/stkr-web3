import {
  Box,
  fade,
  IconButton,
  Paper,
  Theme,
  useTheme,
} from '@material-ui/core';
import { Query } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { formatDistanceToNowStrict } from 'date-fns';
import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import { uid } from 'react-uid';
import { PROVIDER_TOP_UP_PATH } from '../../../../common/const';
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
import { StkrSdk } from '../../../api';
import { EmptyNodeList } from '../EmptyNodeList';
import { NodeListLoader } from '../NodeListLoader';
import { ReactComponent as DockerIcon } from './assets/docker.svg';
import { ReactComponent as LinuxIcon } from './assets/linux.svg';
import { ReactComponent as MacIcon } from './assets/mac.svg';
import { ReactComponent as WindowsIcon } from './assets/windows.svg';
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
  onTopUp: () => void;
  balance: BigNumber;
}

export const NodeListComponent = ({
  data,
  onCreateNode,
  onTopUp,
  balance,
}: INodeListProps) => {
  const classes = useNodeListStyles();
  const captions = useCaptions();
  const hasTransactions = data.length > 0;
  const theme = useTheme();

  const renderedCells = useMemo(
    () =>
      data.map((item, i) => {
        const commonCellProps = {
          style: { animationDelay: `${i * 0.1}s` },
          className: classes.tableCell,
        };

        return (
          <TableRow key={uid(item)}>
            <TableBodyCell {...commonCellProps}>
              {getSidecarName(item)}
            </TableBodyCell>

            <TableBodyCell {...commonCellProps}>
              {getSidecarStatus(item, theme)}
            </TableBodyCell>

            <TableBodyCell {...commonCellProps}>
              {formatDistanceToNowStrict(
                item?.machine?.currentTime
                  ? new Date(item.machine.currentTime * 1000)
                  : new Date(),
                { addSuffix: true },
              )}
            </TableBodyCell>

            <TableBodyCell {...commonCellProps}>
              {t('format.date', { value: item.created })}
            </TableBodyCell>

            <TableBodyCell
              {...commonCellProps}
              classes={{ cellWrapper: classes.icons }}
            >
              <Box display="inline-block">
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
              </Box>
              <Box display="inline-block">
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

                <IconButton
                  component="a"
                  className={classes.icon}
                  onClick={() => {
                    StkrSdk.getLastInstance().downloadSidecar(
                      item.id,
                      'docker',
                    );
                  }}
                  target="_blank"
                >
                  <DockerIcon />
                </IconButton>
              </Box>
            </TableBodyCell>
          </TableRow>
        );
      }),
    [classes.icon, classes.icons, classes.tableCell, data, theme],
  );

  if (hasTransactions) {
    return (
      <>
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
            <TableBody rowsCount={data.length}>{renderedCells}</TableBody>
          )}
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
  const history = useHistory();

  const handleTopUp = useCallback(() => {
    history.push(PROVIDER_TOP_UP_PATH);
  }, [history]);

  return (
    <Query<IProviderStats | null>
      type={UserActionTypes.FETCH_PROVIDER_STATS}
      showLoaderDuringRefetch={false}
    >
      {({ data: statsData }) => {
        return (
          <>
            {statsData?.balance && (
              <NodeListComponent
                data={data}
                onCreateNode={handleCreateNode}
                onTopUp={handleTopUp}
                balance={statsData.balance}
              />
            )}
          </>
        );
      }}
    </Query>
  );
};
