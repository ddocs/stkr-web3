import { IconButton, Tooltip } from '@material-ui/core';
import * as React from 'react';
import { uid } from 'react-uid';
import { useLocaleMemo } from '../../../../../../common/hooks/useLocaleMemo';
import { WithUseStyles } from '../../../../../../common/types';
import { t } from '../../../../../../common/utils/intl';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../../../../../components/TableComponents';
import { AlignType } from '../../../../../../components/TableComponents/types';
import { QuestionIcon } from '../../../../../../UiKit/Icons/QuestionIcon';
import { NavLink } from '../../../../../../UiKit/NavLink';
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
        label: t('staker-dashboard.column.status'),
        tip: t('staking-history-table.tip.status'),
      },
      {
        label: t('staker-dashboard.column.staked'),
        tip: t('staking-history-table.tip.amount'),
      },
      {
        label: t('staker-dashboard.column.transaction-hash'),
        tip: t('staking-history-table.tip.txid'),
        align: 'right',
      },
    ],
    [],
  );

  return (
    <div className={classes.root}>
      <Table
        customCell="1fr 1fr 1fr"
        columnsCount={captions.length}
        minWidth={0}
        paddingCollapse
      >
        <TableHead>
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
            />
          ))}
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={uid(item)}>
              <TableBodyCell label={`${captions[0].label}`}>
                {t(`stake-statuses.${item.action}`)}
              </TableBodyCell>

              <TableBodyCell label={`${captions[1].label}`}>
                {t('unit.eth-value', {
                  value: item.amount,
                })}
              </TableBodyCell>

              <TableBodyCell align="right" label={`${captions[2].label}`}>
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
