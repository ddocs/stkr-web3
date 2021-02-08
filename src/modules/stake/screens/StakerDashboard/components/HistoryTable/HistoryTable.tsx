import * as React from 'react';
import { useHistoryTableStyles } from './HistoryTableStyles';
import { Table } from '../../../../../../components/TableComponents/Table';
import { TableHead } from '../../../../../../components/TableComponents/TableHead';
import { TableHeadCell } from '../../../../../../components/TableComponents/TableHeadCell';
import { TableBody } from '../../../../../../components/TableComponents/TableBody';
import { TableRow } from '../../../../../../components/TableComponents/TableRow';
import { uid } from 'react-uid';
import { TableBodyCell } from '../../../../../../components/TableComponents/TableBodyCell';
import { t } from '../../../../../../common/utils/intl';
import { NavLink } from '../../../../../../UiKit/NavLink';
import { isMainnet } from '../../../../../../common/const';
import { useLocaleMemo } from '../../../../../../common/hooks/useLocaleMemo';
import classNames from 'classnames';
import { AlignType } from '../../../../../../components/TableComponents/types';
import { IconButton, Tooltip } from '@material-ui/core';
import { QuestionIcon } from '../../../../../../UiKit/Icons/QuestionIcon';
import { WithUseStyles } from '../../../../../../common/types';
import { StkrSdk } from '../../../../../api';

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
        paddingCollapse={true}
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
        <TableBody
          rowsCount={data.length}
          className={classes.body}
          sideOffset={8}
        >
          {data.map(item => (
            <TableRow key={uid(item)}>
              <TableBodyCell
                className={classNames(classes.cell, classes.bodyCell)}
              >
                {t(`stake-statuses.${item.action}`)}
              </TableBodyCell>
              <TableBodyCell
                className={classNames(classes.cell, classes.bodyCell)}
              >
                {t('unit.eth-value', {
                  value: item.amount,
                })}
              </TableBodyCell>
              <TableBodyCell
                className={classNames(classes.cell, classes.bodyCell)}
                align="right"
              >
                <NavLink
                  href={StkrSdk.getForEnv().createExplorerLink(
                    item.transactionHash,
                  )}
                >
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
