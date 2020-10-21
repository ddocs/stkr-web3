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
import { Button } from '../../../../UiKit/Button';
import { StkrSdk } from '../../../api';
import { uid } from 'react-uid';
import { ISidecar } from '../../../../store/apiMappers/sidecarsApi';
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

export const NodeListComponent = ({ className, data }: INodeListProps) => {
  const classes = useNodeListStyles();

  const captions = useCaptions();

  return (
    <div className={classNames(classes.component, className)}>
      <Table
        customCell="1fr 1fr 1fr 1fr 0.7fr"
        columnsCount={captions.length}
        className={classes.table}
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
                    size={'small'}
                  >
                    {t('navigation.download')}
                  </Button>
                  <br />
                  <Button
                    onClick={async () => {
                      console.log(item);
                      /* TODO: "move me to actions too" */
                      await StkrSdk.getLastInstance().manuallyStartSidecar(
                        item.id,
                      );
                      /* TODO: "refresh sidecar list" */
                      alert('Successfully pushed');
                    }}
                    size={'small'}
                  >
                    {t('navigation.push-manually')}
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

export const NodeList = ({
  className,
  data,
}: {
  className?: string;
  data: ISidecar[];
}) => {
  return <NodeListComponent className={className} data={data} />;
};
