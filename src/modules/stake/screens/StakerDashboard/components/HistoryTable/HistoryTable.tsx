import { IconButton, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import { uid } from 'react-uid';
import { useLocaleMemo } from '../../../../../../common/hooks/useLocaleMemo';
import { WithUseStyles } from '../../../../../../common/types';
import { t } from '../../../../../../common/utils/intl';
import { Table } from '../../../../../../components/TableComponents/Table';
import { TableBody } from '../../../../../../components/TableComponents/TableBody';
import { TableBodyCell } from '../../../../../../components/TableComponents/TableBodyCell';
import { TableHead } from '../../../../../../components/TableComponents/TableHead';
import { TableHeadCell } from '../../../../../../components/TableComponents/TableHeadCell';
import { TableRow } from '../../../../../../components/TableComponents/TableRow';
import { NavLink } from '../../../../../../UiKit/NavLink';
import { AlignType } from '../../../../../../components/TableComponents/types';
import { QuestionIcon } from '../../../../../../UiKit/Icons/QuestionIcon';
import { StkrSdk } from '../../../../../api';
import { useHistoryTableStyles } from './HistoryTableStyles';

function getTxLink(txID: string) {
  try {
    return StkrSdk.getForEnv().createExplorerLink(txID);
  } catch (error) {
    return '';
  }
}

type CaptionType = {
  label: string;
  tip?: string;
  align?: AlignType;
};

interface IHistoryTableProps
  extends Partial<WithUseStyles<typeof useHistoryTableStyles>> {
  className?: string;
  data: Array<Record<string, any>>;
}

export const HistoryTable = (props: IHistoryTableProps) => {
  const { data } = props;
  const classes = useHistoryTableStyles(props);

  const captions: CaptionType[] = useLocaleMemo(
    () => [
      {
        label: t('staked-dashboard.column.status'),
        tip: t('staking-history-table.tip.status'),
      },
      {
        label: t('staked-dashboard.column.staked'),
        tip: t('staking-history-table.tip.amount'),
      },
      {
        label: t('staked-dashboard.column.transaction-hash'),
        tip: t('staking-history-table.tip.txid'),
        align: 'right',
      },
    ],
    [],
  );

  return (
    <div className={classes.root}>
      <Table
        className={classes.tableWrapper}
        customCell="1fr 1fr 1fr"
        columnsCount={captions.length}
        classes={{ table: classes.table }}
        paddingCollapse
      >
        <TableHead className={classes.head}>
          {captions.map(cell => (
            <TableHeadCell
              key={cell.label}
              label={
                <>
                  {cell.label}
                  {cell.tip && (
                    <Tooltip title={cell.tip}>
                      <IconButton className={classes.question}>
                        <QuestionIcon size="xs" />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              }
              classes={{ content: classes.headCellContent }}
              align={cell.align}
              className={classNames(classes.cell, classes.headCell)}
            />
          ))}
        </TableHead>
        <TableBody className={classes.body}>
          {data.map(item => (
            <TableRow key={uid(item)}>
              <TableBodyCell
                className={classNames(classes.cell, classes.bodyCell)}
                label={`${captions[0].label}`}
              >
                {t(`stake-statuses.${item.action}`)}
              </TableBodyCell>

              <TableBodyCell
                className={classNames(classes.cell, classes.bodyCell)}
                label={`${captions[1].label}`}
              >
                {t('unit.eth-value', {
                  value: item.amount,
                })}
              </TableBodyCell>

              <TableBodyCell
                className={classNames(classes.cell, classes.bodyCell)}
                align="right"
                label={`${captions[2].label}`}
              >
                <NavLink href={getTxLink(item.transactionHash)}>
                  {item.transactionHash}
                </NavLink>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
