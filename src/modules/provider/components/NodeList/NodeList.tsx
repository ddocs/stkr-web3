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
import { formatDistanceToNowStrict } from 'date-fns';
import { Query } from '@redux-requests/react';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { ISidecarStatus } from '../../../../store/apiMappers/sidecarStatus';
import { safeDiv } from '../../../../common/utils/safeDiv';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { IconButton } from '@material-ui/core';
import { ReactComponent as WindowsIcon } from './assets/windows.svg';
import { ReactComponent as LinuxIcon } from './assets/linux.svg';
import { ReactComponent as MacIcon } from './assets/mac.svg';

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

export const NodeListComponent = ({ className, data }: INodeListProps) => {
  const classes = useNodeListStyles();

  const captions = useCaptions();

  return (
    <div className={classNames(classes.component, className)}>
      <Table
        customCell="1.1fr 0.6fr 0.5fr 0.7fr 0.7fr"
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
                <TableBodyCell>{item.id}</TableBodyCell>
                <TableBodyCell>
                  <Query<ISidecarStatus | undefined>
                    loadingComponent={QueryLoading}
                    loadingComponentProps={{ size: 20 }}
                    errorComponent={() => (
                      <>t(`beacon-list.status.${item.status}`)</>
                    )}
                    noDataMessage={t(`beacon-list.status.${item.status}`)}
                    type={UserActionTypes.FETCH_SIDECAR_STATUS}
                    requestKey={item.id}
                  >
                    {({ data }) => {
                      if (item.status === 'VALIDATOR_STATUS_FREE') {
                        return t('node-list.syncing', {
                          value: safeDiv(
                            data?.chain.currentSlot,
                            data?.chain.latestSlot,
                          ).toFixed(0),
                        });
                      }

                      return t(`beacon-list.status.${item.status}`);
                    }}
                  </Query>
                </TableBodyCell>
                <TableBodyCell>
                  {formatDistanceToNowStrict(item.created, { addSuffix: true })}
                </TableBodyCell>
                <TableBodyCell>
                  {t('format.date', { value: item.created })}
                </TableBodyCell>
                <TableBodyCell>
                  <a
                    href={StkrSdk.getLastInstance().createSidecarDownloadLink(
                      item.id,
                      'windows64',
                    )}
                  >
                    <IconButton className={classes.icon}>
                      <WindowsIcon />
                    </IconButton>
                  </a>
                  <a
                    href={StkrSdk.getLastInstance().createSidecarDownloadLink(
                      item.id,
                      'linux64',
                    )}
                  >
                    <IconButton className={classes.icon}>
                      <LinuxIcon />
                    </IconButton>
                  </a>
                  <a
                    href={StkrSdk.getLastInstance().createSidecarDownloadLink(
                      item.id,
                      'darwin64',
                    )}
                  >
                    <IconButton className={classes.icon}>
                      <MacIcon />
                    </IconButton>
                  </a>
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
